import { Basket } from "@/components/basket";
import { Footer, Navigation } from "@/components/common";
import * as ROUTES from "@/constants/routes";
import { createBrowserHistory } from "history";
import React from "react";
import { Route, Router, Switch } from "react-router-dom";
import * as view from "@/views";
import AdminRoute from "./AdminRoute";
import ClientRoute from "./ClientRoute";
import PublicRoute from "./PublicRoute";

export const history = createBrowserHistory();

const AppRouter = () => (
  <Router history={history}>
    <>
      <Navigation />
      <Basket />
      <Switch>
        <Route component={view.Search} exact path={ROUTES.SEARCH} />
        <Route component={view.Home} exact path={ROUTES.HOME} />
        {/* <Route component={view.Home} exact path={ROUTES.HOME} /> */}
        <Route component={view.Shop} exact path={ROUTES.SHOP} />
        <Route component={view.AllOrders} exact path={ROUTES.ALL_ORDERS} />
        <Route
          component={view.FeaturedProducts}
          exact
          path={ROUTES.FEATURED_PRODUCTS}
        />
        <Route
          component={view.KidsProducts}
          exact
          path={ROUTES.KIDS_PRODUCTS}
        />
        <Route
          component={view.StichedProducts}
          exact
          path={ROUTES.STICHED_PRODUCTS}
        />
         <Route
          component={view.WinterStichedProducts}
          exact
          path={ROUTES.WINTER_STICHED_PRODUCTS}
        />
        <Route
          component={view.SummerStichedProducts}
          exact
          path={ROUTES.SUMMER_STICHED_PRODUCTS}
        />
         <Route
          component={view.SummerUnStichedProducts}
          exact
          path={ROUTES.SUMMER_UNSTICHED_PRODUCTS}
        />
        <Route
          component={view.WinterUnStichedProducts}
          exact
          path={ROUTES.WINTER_UNSTICHED_PRODUCTS}
        />
         <Route
          component={view.WinterKidsProducts}
          exact
          path={ROUTES.WINTER_KIDS_PRODUCTS}
        />
         <Route
          component={view.SummerKidsProducts}
          exact
          path={ROUTES.SUMMER_KIDS_PRODUCTS}
        />
        <Route
          component={view.UnstichedProducts}
          exact
          path={ROUTES.UNSTICHED_PRODUCTS}
        />
        <Route
          component={view.RecommendedProducts}
          exact
          path={ROUTES.RECOMMENDED_PRODUCTS}
        />
        <Route
          component={view.AccessoriesProducts}
          exact
          path={ROUTES.ACCESSORIES_PRODUCTS}
        />
        <PublicRoute component={view.SignUp} path={ROUTES.SIGNUP} />
        <PublicRoute component={view.SignIn} exact path={ROUTES.SIGNIN} />

        <PublicRoute
          component={view.ForgotPassword}
          path={ROUTES.FORGOT_PASSWORD}
        />

        <Route component={view.ViewProduct} path={ROUTES.VIEW_PRODUCT} />
        <Route component={view.ContactUs} path={ROUTES.CONTACT_US} />
        <Route component={view.AboutUs} path={ROUTES.ABOUT_US} />
        <Route component={view.PrivacyPolicy} path={ROUTES.PRIVACY_POLICY} />
        <Route component={view.FAQ} path={ROUTES.FAQ} />
        <Route component={view.TermCondition} path={ROUTES.TERM_CONDITION} />
        <Route component={view.ReturnExchange} path={ROUTES.RETURN_EXCHANGE} />
        <ClientRoute component={view.UserAccount} exact path={ROUTES.ACCOUNT} />
        <ClientRoute
          component={view.EditAccount}
          exact
          path={ROUTES.ACCOUNT_EDIT}
        />
        <ClientRoute
          component={view.CheckOutStep1}
          path={ROUTES.CHECKOUT_STEP_1}
        />
        <ClientRoute
          component={view.CheckOutStep2}
          path={ROUTES.CHECKOUT_STEP_2}
        />
        <ClientRoute
          component={view.CheckOutStep3}
          path={ROUTES.CHECKOUT_STEP_3}
        />
        <AdminRoute
          component={view.Dashboard}
          exact
          path={ROUTES.ADMIN_DASHBOARD}
        />
        <AdminRoute 
        component={view.Orders}
        exact
        path={ROUTES.ADMIN_ORDERS} 
        />
        
        <AdminRoute component={view.OrderDetails} exact path={ROUTES.ORDER_DETAILS} />
        <AdminRoute component={view.BankDetails} exact path={ROUTES.ADMIN_BANK_DETAILS} />
        <AdminRoute component={view.Products} path={ROUTES.ADMIN_PRODUCTS} />
        <AdminRoute component={view.UploadBannerImage} path={ROUTES.ADMIN_UPLOAD_BANNER} />
        <AdminRoute component={view.UploadHomeImages} path={ROUTES.ADMIN_UPLOAD_HOME_BANNER} />

        <AdminRoute 
        component={view.DeliveredOrders}
        exact
        path={ROUTES.ADMIN_DELIVERED_ORDERS} 
        />
        <AdminRoute 
        component={view.RejectedOrders}
        exact
        path={ROUTES.ADMIN_REJECTED_ORDERS} 
        />
        <AdminRoute 
        component={view.ContactDetails}
        exact
        path={ROUTES.ADMIN_CONTACT_DETAILS} 
        />
        <AdminRoute component={view.Users} path={ROUTES.ADMIN_USERS} />
        <AdminRoute component={view.AddProduct} path={ROUTES.ADD_PRODUCT} />
        <AdminRoute
          component={view.EditProduct}
          path={`${ROUTES.EDIT_PRODUCT}/:id`}
        />

        <PublicRoute component={view.PageNotFound} />
      </Switch>
      <Footer />
    </>
  </Router>
);

export default AppRouter;
