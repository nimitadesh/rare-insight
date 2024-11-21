const dotenv = require("dotenv");
dotenv.config({ path: "../.env" });

const axios = require("axios");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const rareDiseaseTypes = ["sclerosis", "sickle", "narcolepsy", "hemophilia", "duchenne"];

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const formatDate = dateParts => {
    if (!dateParts) return "Date not available";
    const [year, month = 1, day = 1] = dateParts[0];
    return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  };

const fetchAndStoreArticles = async () => {
  for (let rareDiseaseType of rareDiseaseTypes) {
    try {
      const response = await axios.get(
        `https://api.crossref.org/works?query.title=${rareDiseaseType}&query.publisher-name=elsevier&sort=published&order=desc&rows=5`
      );

      if (response.status === 200) {
        for (let article of response.data.message.items) {
          const publishedDate = formatDate(
            article.published?.["date-parts"] ||
              article["published-print"]?.["date-parts"] ||
              article.issued?.["date-parts"]
          );

          const articleUrl = article.resource?.primary?.URL || article.URL;

          let articleTags = await model.generateContent(`This is the title of a research article about ${rareDiseaseType}: ${article.title}. Based on the title, generate 3-4 relevant article tags that can be used for categorization and filtering purposes. Return ONLY a single string with all tags delimited by commas as a response.`);

          await axios.post("http://localhost:3001/articles", {
            title: article.title[0],
            source: article.publisher,
            author: "",
            publishedDate: publishedDate,
            url: articleUrl,
            tags: articleTags ? articleTags.response.text() : "",
            summary: articleSummary,
          });

          console.log("------------ ARTICLE INFO ------------")
          console.log("Article title: " + article.title[0])
          console.log("Article source: " + article.publisher)
          console.log("Article publishedDate: " + publishedDate)
          console.log("Article url: " + articleUrl)
          console.log("Article tags: " + articleTags.response.text())

          console.log("Article '${article.title[0]}' stored successfully.");
          await delay(1000);
        }
      } else {
        console.log("No articles found for this query.");
      }
    } catch (error) {
      console.error("Error fetching articles:", error.message);
    }
  }
};

fetchAndStoreArticles();