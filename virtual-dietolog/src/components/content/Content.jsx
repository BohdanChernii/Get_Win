import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import Navigation from "@/components/Navigation.jsx";
import Header from "@/components/Header.jsx";
import PersonalInformationPage from "@/components/pages/PersonalInformationPage.jsx";
import QuestionnairePage from "@/components/pages/QuestionnairePage.jsx";
import TargetPage from "@/components/pages/Target.jsx";
import FoodBasket from "@/components/pages/FoodBasket.jsx";
import ActivityPage from "@/components/pages/ActivityPage.jsx";
import SetSelectionPage from "@/components/pages/SetSelectionPage.jsx";
import ApprovedSetsPage from "@/components/pages/ApprovedSetsPage.jsx";
import StatisticsOnSetsPage from "@/components/pages/StatisticsOnSetsPage.jsx";
import MacroNutrientsPage from "@/components/pages/MacroNutrientsPage.jsx";
import MicroNutrientsPage from "@/components/pages/MicroNutrientsPage.jsx";
import NutritionalFeaturesPage from "@/components/pages/NutritionalFeaturesPage.jsx";
import ExcludedProductsPage from "@/components/pages/ExcludedProductsPage.jsx";
import StatisticsOnPeriod from "@/components/pages/StatisticsOnPeriod.jsx";

function Content() {
   return (
      <main className='wrapper _container _flex-row_start'>
         <Navigation/>
         <section className='content'>
            <Header/>
            <section className='page'>
               <Switch>
                  <Redirect exact from="/" to='/personal-information'/>
                  <Route path='/personal-information' component={PersonalInformationPage}/>
                  <Route path='/questionnaire' component={QuestionnairePage}/>
                  <Route path='/target' component={TargetPage}/>
                  <Route path='/food-basket' component={FoodBasket}/>
                  <Route path='/activity' component={ActivityPage}/>
                  <Route path='/set-selection' component={SetSelectionPage}/>
                  <Route path='/approved-sets' component={ApprovedSetsPage}/>
                  <Route path='/statistics-on-sets' component={StatisticsOnSetsPage}/>
                  <Route path='/macro-nutrients' component={MacroNutrientsPage}/>
                  <Route path='/micro-nutrients' component={MicroNutrientsPage}/>
                  <Route path='/nutritional-features' component={NutritionalFeaturesPage}/>
                  <Route path='/excluded-products' component={ExcludedProductsPage}/>
                  <Route path='/statistics-on-period' component={StatisticsOnPeriod}/>
               </Switch>
            </section>
         </section>
      </main>
   );
}

export default Content;