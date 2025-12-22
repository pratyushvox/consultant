export interface StatCard {
    id:number;
    title:string;
    count:number
}

export interface VisaStatus {
    status : string ;
    count:number;

}

export interface Conversion {
    type:string;
    count:number
}

export interface DashboardData {
    statsCards: StatCard[];
    visaStatusData : VisaStatus[];
    conversionsData : Conversion[];
}
