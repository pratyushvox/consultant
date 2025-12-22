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

export interface Counselor {
    id: string;
    name: string;
}


export interface DashboardData {
    statsCards: StatCard[];
    visaStatusData : VisaStatus[];
    conversionsData : Conversion[];
    counselor : Counselor[]
}
