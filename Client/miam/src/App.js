import { Route, Switch } from "react-router-dom";
import MenuCreation from "./containers/MenuCreation/MenuCreation";
import WelcomePage from "./components/WelcomePage/welcomePage";
import Layout from "./HOC/Layout/layout";
import Header from "./components/Header/header";
import ErrorPage from "./components/errorPage/errorPage";

function App() {
  return (
    <Layout>
      <Header />
      <Switch>
        <Route path="/menu" component={MenuCreation} />
        <Route path="/error" component={ErrorPage} />
        <Route path="/" component={WelcomePage}/>
        
      </Switch>
    </Layout>
  );
}

export default App;
