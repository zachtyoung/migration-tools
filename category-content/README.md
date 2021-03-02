# Category Content import tool
The Category Content import tool is expected to get the category content (description, template file, and thumbnail) from one site and update the categories on a different site. 

## Steps (not finalized)
1. Create csv of categories with 1 column named "Name" and the name of each category to be copied. 
2. Save that csv as "categories.csv" and drop it into the root folder "category-content". Replace existing file if needed.
3. Provide the source and destination store hashes in the .env file. 
4. Run node index.js

### Tech Details
