import React, { useMemo } from "react";
import '../../assets/style/components/chatbot.scss';
import { MetaInfo } from "../../components";
import { RoutesConfig } from "../../config/routes.config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlagUsa } from "@fortawesome/free-solid-svg-icons";
import { } from "@fortawesome/fontawesome-svg-core";
import { FeatureList } from "../Home/components";
import SearchForm from "./components/SearchForm";
import { CountryInfoConfig, FeatureInfo } from "../../config/features.config";
import { LabelsConfig } from "../../config/labels.config";

const Chatbot: React.FC = () => {
  const _featureList = useMemo<FeatureInfo[]>(() => {
    return Object.keys(CountryInfoConfig).map((key) => CountryInfoConfig[key]);
  }, []);

  return (
    <div id="chatbot" className="view-wrapper">
      <MetaInfo {...RoutesConfig.About.metaInfo} />
      <section className="hero is-dark">
        <div className="hero-body">
          <div className="container has-text-centered">
            <div className="is-flex is-horizontal-center">
              <figure className="image is-158x158">
                <FontAwesomeIcon icon={faFlagUsa} className={"react-svg"} />
              </figure>
            </div>
            <h1 className="title blog-title">{LabelsConfig.SearchCountryInfo.value}</h1>
            <hr />
            <FeatureList featureList={_featureList} />
          </div>
        </div>
      </section>

      <section className="container dashboard-content">
        <SearchForm />
      </section>
    </div>
  );
};

export default Chatbot;
