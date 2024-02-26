import { bronzeTestUsers, carbonTestUsers, corpTestUsers, demoTestUsers, drprodTestUsers, Environments, prodTestUsers, tinTestUsers } from "../constants"


export enum AccountType {
  SUPERUSER = 'SuperUser',
  COMPANYADMIN = 'CompanyAdmin',
  SYSTEM_ADMIN_VIEWINGCO = 'SystemAdminViewingCo',
  SYSTEM_ADMIN_VIEWING_GRPENABLED = 'SystemAdminViewingGroupEnabledCo',
  PSUEDO_COMPANYSET_ADMIN = 'PseudoCompanySetAdmin',
  SYSTEM_ADMIN_VIEWING_WEBTIME_ENBLEDCO= 'SystemAdminViewingWebTimeEnabledCo',
  SFTP_INTEGRATION_USER = 'SFTPIntegrationUser',
  C0131_IMPERSONATED_USER_COMPANYADMIN = 'C0131ImpersonatedUserCompanyAdmin',
  COMPANYSET_ADMIN_VIEWINGCO = 'CompanySetAdminViewingCo',
  EMPLOYEE_SKILLS_CO = 'EmployeeSkillsCo',
  IMPLEMENTATION_COMPANY_ADMIN = 'ImplementationCompanyAdmin',
  WEBTIME_PSUEDO_CO = 'WebTimePseudoCo',
  PARTNETSET_ADMIN = 'PartnerSetAdmin',
  COMPANYSET_ADMIN = 'CompanySetAdmin',
  B6001_IMPERSONATED_USER_P2 = 'B6001ImpersonatedUserP2'
}

export function getUser(env: Environments){

 switch(env){
    case Environments.Tin: 
      return tinTestUsers

    case Environments.Bronze: 
      return bronzeTestUsers
    
    case Environments.Carbon: 
      return carbonTestUsers

    case Environments.Dc1Corp: 
      return corpTestUsers

    case Environments.Demo: 
      return demoTestUsers

    case Environments.Drprod: 
      return drprodTestUsers

    case Environments.Dc1Prod: 
      return prodTestUsers

    default: 
      console.log('No such environment, setting to the tin users')
      return tinTestUsers
  }
}