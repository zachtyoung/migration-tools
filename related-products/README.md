# Related Products import tool
The related products import tool is expected to take a product export CSV from one BigCommerce and import the related products to another store. 

## Steps (not finalized)
1. Export CSV of products from store A
2. Import CSV of products to store B
3. Run script using the CSV of products for products now in store B

### Tech Details
1. Iterate over CSV of products
2. Make GET request to store A with product ID 
3. Extract related products as product ID
4. Make GET request to get sku from product ID
5. Make PUT request to store B with sku and related products array. 
6. Repeat until all products have been updated
7. Log any errors/issue with specific products