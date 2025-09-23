import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserRegister from "../pages/UserRegister";
import UserSignin from "../pages/UserSignin";
import FoodPartnerRegister from "../pages/FoodPartnerRegister";
import FoodPartnerSignin from "../pages/FoodPartnerSignin";
import LandingChoice from "../pages/LandingChoice";
import PostFoodVideo from "../foodVideos/PostFoodVideo";
import WatchFoodVideo from "../foodVideos/WatchFoodVideo";
import FoodPartnerProfile from "../foodPartner/FoodPartnerProfile";
import SaveFoodVideo from "../foodVideos/SaveFoodVideo";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingChoice />} />
        <Route path="/user/register" element={<UserRegister />} />
        <Route path="/user/signin" element={<UserSignin />} />
        <Route
          path="/food-partner/register"
          element={<FoodPartnerRegister />}
        />
        <Route path="/food-partner/signin" element={<FoodPartnerSignin />} />
        <Route path="/food-partner/:id" element={<FoodPartnerProfile />} />

        <Route path="/post-food-video" element={<PostFoodVideo />} />
        <Route path="/watch-food-video" element={<WatchFoodVideo />} />
        <Route path="/save-video" element={<SaveFoodVideo />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
