function determineLikeliness(rate){
    let likeliness;
    if(rate > 0.2){
        likeliness = "highly unlikely"
    }
    else if(rate > 0.15 && rate <=0.2){
        likeliness = "unlikely"
    }
    else if(rate > 0.05 && rate <= 0.15){
        likeliness = "likely"
    }
    else{
        likeliness = "highly likely "
    }
    return likeliness;

}



function ScenarioAnalysis(
  currentTotalFunds,
  averageSavingsDeposits,
  averageInvestmentDeposits,
  savingsGoalsDate,
  savingsGoalAmount
) {

  let desiredRate;  
  let today = new Date();
  let currentYear = today.getFullYear();
  let currentMonth = today.getMonth() + 1;

  let goalDateArray = savingsGoalsDate.split("/");
  let goalDateMonth = parseInt(goalDateArray[0]);
  let goalDateYear = parseInt(goalDateArray[2]);


  let totalMonthsCurrent = currentYear * 12 + currentMonth;
  let totalMonthsToGoal = goalDateYear * 12 + goalDateMonth;


  let monthDiff = (totalMonthsToGoal - totalMonthsCurrent);
  console.log(monthDiff)

  let amountOnlyWithSavingsDeposits = currentTotalFunds + averageSavingsDeposits*monthDiff


  if(amountOnlyWithSavingsDeposits >= savingsGoalAmount){
      return `If you deposit ${averageSavingsDeposits} per month until your goal date you do not need to add to your investments in order to reach your goal`
  }
  else{
    if(averageInvestmentDeposits >0){
        let foundFV;
        let necessaryFV = savingsGoalAmount-amountOnlyWithSavingsDeposits; 
        console.log(necessaryFV)
        for(let i = 0; i < 3; i+=0.0001){
            foundFV = averageInvestmentDeposits * ((((1+i)**monthDiff)-1)/i)
            if(foundFV >= necessaryFV){
                console.log(foundFV)
                console.log(i)
                desiredRate = i;
                break
            }
        }
        if(typeof(desiredRate) == undefined){
            return 'Your rate of return on investment must be over 300% monthly. We deem this near impossible'
        }
        else{
            let yearlyReturn = ((1+desiredRate)**12) -1;
            let likeliness = determineLikeliness(yearlyReturn)
            let returnYearlyPercent = (yearlyReturn*100).toFixed(3)
            let returnMonthlyPercent = (desiredRate*100).toFixed(3)
            return `You will require a ${returnYearlyPercent}% annual, or ${returnMonthlyPercent}% monthly return to achieve your savings goal. We deem this ${likeliness}`
        }
    }
    else{
        return "You must deposit a positive amount on investments in order to make your savings goal"
    }
  }
}