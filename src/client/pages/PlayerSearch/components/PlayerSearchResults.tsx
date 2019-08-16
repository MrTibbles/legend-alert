import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { styled } from "linaria/react";
import Button from "../../../primitives/Button";
import leftArrow from "../../../images/left-arrow.20x36.svg";
import { useActivePlayer } from "../../../context/ActivePlayer";
import { PlayerSearchResult } from "../types";

const BackButton = styled(Button)`
  display: block;
  background: url(${leftArrow}) left center no-repeat;
  background-size: auto 100%;
  padding-left: 3rem;
  margin-bottom: 1.5rem;
`;

const SearchResultsContainer = styled.div`
  padding-top: 1rem;
`;

const SearchResultsList = styled.ul`
  list-style: none;
  margin: 1rem 0;

  li {
    display: flex;
    cursor: pointer;
  }
`;

interface PlayerSearchResultsProps {
  goBack: React.Dispatch<React.SetStateAction<boolean>>;
  results: PlayerSearchResult[];
}

const PlayerSearchResults: React.FunctionComponent<
  PlayerSearchResultsProps & RouteComponentProps
> = ({ goBack, history, results = [] }): JSX.Element => {
  const { setActivePlayer } = useActivePlayer();

  const onClickGoBack = () => goBack(false);

  const onSelectLegend = (legendIdx: number): void => {
    const targetActivePlayer: PlayerSearchResult = results[legendIdx];

    setActivePlayer(targetActivePlayer);

    history.push("/stats");
  };

  if (!results.length) {
    return (
      <section className="pane">
        <SearchResultsContainer>
          <BackButton onClick={onClickGoBack}>
            <p>Search again</p>
          </BackButton>
          <h3 className="error-msg text-center">
            No players were found with those details
          </h3>
        </SearchResultsContainer>
      </section>
    );
  }

  return (
    <section data-testid="search-results">
      <SearchResultsContainer>
        <BackButton onClick={onClickGoBack}>
          <p>Search again</p>
        </BackButton>
        <h3>The following players matched your search</h3>
        <p>Select one to see how much of a legend they are:</p>
        <SearchResultsList data-testid="search-results">
          {results.map(({ platformSlug, platformUserId }, idx) => (
            <li
              data-testid={`${platformSlug}-${platformUserId}`}
              key={platformSlug}
              onClick={() => onSelectLegend(idx)}
            >
              <h3>
                <span className="highlight" data-testid="user-handle">
                  {platformUserId}
                </span>
                &nbsp;on&nbsp;
                <span
                  className="highlight uppercase"
                  data-testid="user-platform"
                >
                  {platformSlug}
                </span>
              </h3>
            </li>
          ))}
        </SearchResultsList>
      </SearchResultsContainer>
    </section>
  );
};

export default withRouter(PlayerSearchResults);
