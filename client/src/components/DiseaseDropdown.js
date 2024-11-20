export default function DiseaseDropdown({ rareDiseases }) {
    return (
        <form className="mt-5">
            <select 
                id="countries" 
                className="dropdown-button" data-dropdown-toggle="dropdown" class="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600" type="button"
            >
                <option value="">All rare diseases</option>
                {rareDiseases.map((rareDisease) => (
                    <option key={rareDisease} value={rareDisease}>{rareDisease}</option>
                ))}
            </select>
        </form>
    );
}
