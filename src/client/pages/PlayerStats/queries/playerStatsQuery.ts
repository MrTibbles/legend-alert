interface InputArgs {
  platformSlug: string;
  platformUserId: string;
}

const query = ({ platformSlug, platformUserId }: InputArgs): string => `
  fragment statDetailsFragment on StatDataItem {
    displayName
    displayCategory
    displayValue
  }

  query playerStatsQuery {
    playerStats(filter: { playerUserId: "${platformUserId}", platformSlug: "${platformSlug}", segmentsFilter: "legend" }) {
      segments {
        type
        metadata {
          name
          imageUrl
          tallImageUrl
          isActive
  			}
        stats {
          level {
  					...statDetailsFragment
  				}
          kills {
  					...statDetailsFragment
  				}
          damage {
  					...statDetailsFragment
  				}
          headshots {
  					...statDetailsFragment
  				}
          timesPlacedtop3 {
  					...statDetailsFragment
  				}
          seasonWins {
  					...statDetailsFragment
  				}
          season2Wins {
  					...statDetailsFragment
  				}
          rankScore {
  					...statDetailsFragment
  				}
        }
      }
    }
  }
`;

export default query;
