# Related Products import tool
The related products import tool is expected to take a product export CSV from one BigCommerce and import the related products to another store. 

## Steps (not finalized)
1. Export CSV of products from store A
2. Import CSV of products to store B
3. Run script using the CSV of products for products now in store B

### Tech Details
1. Iterate over CSV of products
2. Make GET request to store A with product ID 
3. Extract related products
4. Make PUT request to store B with product ID and related products array. 
5. Repeat until all products have been updated
6. Log any errors/issue with specific products