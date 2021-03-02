# Category Content import tool
The Category Content import tool is expected to get the category content (description, template file, and thumbnail) from one site and update the categories on a different site. 

## Steps (not finalized)
1. Create csv of categories with 1 column named "Name" and the name of each category to be copied. 
2. Save that csv as "categories.csv" and drop it into the root folder "category-content". Replace existing file if needed.
3. Provide the source and destination stores and hashes in the respective variables at the top of index.js
4. Run node index.js
5. Updates should be made and any categories from the list provided that lacks a thumbnail will be output in the         output-log.json    

### Tech Details
