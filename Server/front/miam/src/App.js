import { Route } from "react-router-dom";
import Results from "./components/Results/results";
import MenuCreation from "./containers/WelcomePage/MenuCreation/MenuCreation";
import WelcomePage from "./containers/WelcomePage/WelcomePage";
import Layout from "./HOC/Layout/layout";

function App() {
  return (
    <Layout>
      <Route path="/" exact component={MenuCreation} />
      <Route path="/results" component={Results} />
    </Layout>
  );
}

export default App;
