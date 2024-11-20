const NewsAPI = require("newsapi");
const newsapi = new NewsAPI("3f1c154e865a4fbfb1d0eea50d5fd381");
const axios = require("axios");
const cheerio = require("cheerio");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI("AIzaSyCrE912-81auyi5IEJk2qgE6CP3SYu1bPU");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const rareDiseaseTypes = ["multiple sclerosis"];

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const fetchAndStoreArticles = async () => {

  await axios.delete("http://localhost:3001/articles");

  for (let rareDiseaseType of rareDiseaseTypes) {
    try {
      const response = await newsapi.v2.everything({
        q: rareDiseaseType,
        language: "en",
        searchIn: "title",
        sortBy: "relevancy",
      });

      if (response.status === "ok" && response.articles) {
        for (let article of response.articles) {
          let articleContent = await fetchFullArticleContent(article.url);
          console.log("Article content:")
          console.log(articleContent)

          let articleSummary = await analyzeArticleContent(articleContent, rareDiseaseType);
          console.log("Article Summary:")
          console.log(articleSummary.response.text())

          let articleTags = await model.generateContent(`This is the title of a news article about ${rareDiseaseType}: ${article.title}. This is the complete content of the article: ${article.content}. Based on the title and content of the article, generate 3-4 relevant article tags that can be used for categorization and filtering purposes. Return ONLY a single string with all tags delimited by commas as a response.`);
          console.log("Article Tags:")
          console.log(articleTags.response.text())
          console.log("____________________________________________")
          await axios.post("http://localhost:3001/articles", {
            title: article.title,
            source: article.source.name,
            author: article.author,
            publishedDate: article.publishedAt,
            url: article.url,
            tags: articleTags ? articleTags.response.text() : "",
            summary: articleSummary ? articleSummary.response.text() : ""
          });
          await delay(5000);
        }
      } else {
        console.log("No articles found for this query.");
      }
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  }
}

async function analyzeArticleContent(articleContent, rareDiseaseType) {
  const sentences = articleContent.split(/([.!?]\s)/);
  let paragraphs = [];
  
  while (sentences.length > 0) {
    let paragraph = splitIntoParagraphs(sentences);
    console.log("Paragraph:")
    console.log(paragraph)
    if (paragraph) {
      paragraphs.push(paragraph);
    }
  }

  let combinedSummaries = "";
  
  for (let paragraph of paragraphs) {
    let summary = await model.generateContent(`This is part of a news article about ${rareDiseaseType}: ${paragraph}. Read the paragraph carefully and take note of the key concepts and/or points being highlighted. Then, generate a brief summary of the paragraph, being sure to include only the highlights of the article that would be relevant to an individual having ${rareDiseaseType}.`);
    combinedSummaries += summary.response.text() + " ";
    await delay(10000);
  }

  console.log("Combined summaries:")
  console.log(combinedSummaries)

  const finalSummary = await model.generateContent(`Combine and refine the following partial summaries into a single 1-sentence summary: ${combinedSummaries}`);
  return finalSummary;
}

function splitIntoParagraphs(sentences) {
  const MAX_CHAR_COUNT = 2000;
  let currentCharCount = 0;
  let paragraph = "";

  while (sentences.length > 0) {
    let sentence = sentences.shift();
    if (sentences.length > 0) {
      sentence += sentences.shift();
    }

    if (currentCharCount + sentence.length <= MAX_CHAR_COUNT) {
      paragraph += sentence;
      currentCharCount += sentence.length;
    } else {
      break;
    }
  }

  return paragraph.trim();
}

async function fetchFullArticleContent(url) {
  try {
    const urlResponse = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    const $ = cheerio.load(urlResponse.data);
    let articleContent = "";

    $("p").each((i, element) => {
      articleContent += $(element).text() + " ";
    });

    return articleContent.trim();
  } catch (error) {
    console.error("Error fetching full article content:", error);
    return null;
  }
}


fetchAndStoreArticles();
