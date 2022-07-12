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
  {
    urlToken: 'SanJoseCity'
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

const createElectionFilers = async () => {
  const electionDates = [
    '6/7/2022',
    '11/3/2020',
  ];

  const filers = await SouthTech.getFilers(STAgencies[1].urlToken, electionDates[1]);
  // this returns tha same 10 for each page of filers
  /**
   * In goToDataPageNum try returning the page and passing that page to getTableData
   */
  let filtered = filers.filter((filer) => filer.candidate_last_name);

  // console.log({filtered: filtered.slice(0, 6)});
  console.log({filtered: filtered});
  console.log({filtered_length: filtered.length});
  console.log({filers_length: filers.length});
}

;(async () => {
  try {
    // const result = await getAgencies();
    // const result = await createElectionFilers();

    // const result = await seedAgencyElections({ software: 'SouthTech', agencyList: STAgencies});

    const result = await createElectionFilers();

    // console.log(result);
    
  } catch (error) {
    console.error(error)
  }

})();
