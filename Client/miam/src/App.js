import { Route, Switch } from "react-router-dom";
import Results from "./components/Results/results";
import MenuCreation from "./containers/MenuCreation/MenuCreation";
import WelcomePage from "./containers/WelcomePage/welcomePage";
import Layout from "./HOC/Layout/layout";
import Header from "./components/Header/header";
import ErrorPage from "./components/errorPage/errorPage";

function App() {
  return (
    <Layout>
      <Header />
      <Switch>
        <Route path="/" exact component={WelcomePage} />
        <Route path="/menu" component={MenuCreation} />
        <Route path="/error" component={ErrorPage} />
        
      </Switch>
    </Layout>
  );
}

export default App;
