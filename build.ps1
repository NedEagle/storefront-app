# Start the order service
cd .\order-service\
npm start

# Start the product service
cd ..\product-service\
npm start

# Start the storefront-frontend service
cd ..\storefront-frontend\
$answer = Read-Host "Would you like to run the app on another port instead? (Y/N)"
if ($answer -eq "Y") {
    npm start -- --port 3002
} else {
    npm start
}