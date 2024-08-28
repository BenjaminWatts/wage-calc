# Wage Calculator App

The purpose of this app is to enable a user to calculate their hourly take home pay for remote/hybrid/on-site jobs. It will take the following user inputs:

* Annual Salary (excluding bonuses, including any benefits in kind)
Hours of work per day (default 8)
* Employer pension contribution (default to statutory minimum)
* Employee pension contribution
* Holiday days per year, with predefined options for the Statutory minimum and teachers.
* Slider (0-5) for number of days per week in office
* Children - including names and ages
* Partner's annual income
* Childcare termtime cost per day
* Childcare holiday cost per day

To calculate the cost of commuting:

* Driving distance per commute
* Daily parking cost
* Train/Bus ticket cost (with option to have season ticket options)
* Lunch cost
* Breakfast/coffee cost
* Drycleaning cost
* Dogwalking costs
* Incremental wraparound childcare (for each child)

The calculations with allow for 

* Employee Income Tax and National Insurance
* Child benefit
* Pension - assume that the user will eventually pay 20% tax on it
* Free (or taxfree) childcare credit
* Cost of holiday childcare

The main output will be:

1. Take home pay per hour for 0-5 days in the office, including travel time
2. Payrise required for 1-5 days in the office to maintain take home pay with a fully remote role.
3. Teacher salary required to have same takehome pay for 0-5 days in office
4. TBC - self-employed/freelancer day-rate equivalent

Current bugs
1. Check layout and text wrapping on smaller screen devices

1. Check driving mileage
3. Helmet
7. Bug Reporting Component
9. Prevent innacurate information
12. Advertising
13. Google tracker


# Expo

`eas update --channel preview`
`eas build --profile preview`
`eas submit --profile preview --platform ios --path build-1724791067480.ipa`

# Screenshots

To launch an iOS device with each required screen size:

# iPhone 14 Pro Max (6.7-inch)
xcrun simctl boot "iPhone 14 Pro Max"
npx expo run:ios --device "iPhone 14 Pro Max"

# 5.5 inch display - runs on iOS 16.4
xcrun simctl boot "iPhone 8 Plus"



# Icons 

https://progressier.com/pwa-icons-and-ios-splash-screen-generator
https://www.fanstudio.co.uk/appicon/