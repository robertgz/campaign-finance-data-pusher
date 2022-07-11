import { createAgency } from "./mutations/createAgency.mjs";
import { createElection } from "./mutations/createElection.mjs";
import { getAgencies } from "./queries/getAgencies.mjs";

const STAgencies = [
  {
    urlToken: 'SanDiegoCounty'
  },
  {
    urlToken: 'DavisCity'
  },
  {
    urlToken: 'SantaClaritaCity'
  },
]

// import { SouthTech } from 'local-cfd';
import { SouthTech } from 'campaign-finance-downloader';

const seedAgencyElections = async ({ software, agencyList }) => {
  const results = [];

  for await (const agency of agencyList) {
    const result = await createAgencyElections({ software, urlToken: agency.urlToken });

    results.push(result);
  }

  return results;
}

const createAgencyElections = async ({ software, urlToken }) => {

  const name = await SouthTech.getAgencyName(urlToken);

  const dates = await SouthTech.getElectionDates(urlToken);

  const variables = { name, software, urlToken };
  const agency = await createAgency(variables);

  const agencyId = agency.createAgency.id;

  const results = [];
 
  for await (const date of dates) {
    const result = await createElection({ agencyId: agencyId, date: date });

    results.push(result);
  }

  return results;
}

// const createElectionFilers = async () => {
//   const filers = await SouthTech.getFilers(STAgencies[0].urlToken, '6/7/2022');
//   console.log({filers});
// }

;(async () => {
  try {
    // const result = await getAgencies();
    // const result = await createElectionFilers();

    const result = await seedAgencyElections({ software: 'SouthTech', agencyList: STAgencies});

    // console.log(result);
    
  } catch (error) {
    console.error(error)
  }

})();
