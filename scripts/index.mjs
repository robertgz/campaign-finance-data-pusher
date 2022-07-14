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
];

const STSites = [
  'www.southtechhosting.com/SanDiegoCounty',
  'www.southtechhosting.com/DavisCity',
  'www.southtechhosting.com/SantaClaritaCity',
  'www.southtechhosting.com/SanJoseCity',
  'campaigndocs.co.fresno.ca.us',
  'efiler.stancounty.com',
  'campaign.solanocounty.com',
  'campaigndocs.co.fresno.ca.us',
];

import { SouthTech } from 'local-cfd';
// import { SouthTech } from 'campaign-finance-downloader';

const seedAgencyElections = async ({ software, siteList }) => {
  const results = [];

  for await (const site of siteList) {
    const result = await createAgencyElections({ software, site });

    results.push(result);
  }

  return results;
}

const createAgencyElections = async ({ software, site }) => {

  const name = await SouthTech.getAgencyName(site);
  
  const dates = await SouthTech.getElectionDates(site);
  
  // console.log({ dates })
  // return dates;
  const variables = { name, software, urlToken: '', urlPrefix: site };
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

  const filers = await SouthTech.getFilers(STSites[0], electionDates[0]);
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

    // const result = await seedAgencyElections({ software: 'SouthTech', siteList: STSites });

    // const result = await createAgencyElections({ software: '', site: STSites[0] });


    const result = await createElectionFilers();

    console.log(result);
    
  } catch (error) {
    console.error(error)
  }

})();
