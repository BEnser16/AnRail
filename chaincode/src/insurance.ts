export class InsuranceModel {
    public docType?:string;

    public ID:string;

    public PolicyName:string;

    public State:string;

    public Phrase:number;

    public StartDate:Date;

    public EndDate:Date;

    public ProposerName:string;

    public ProposeID:string;

    public PetChipID:string;

    public PetBornDate:Date;

    public DogNorCat:boolean;


    // //  計算年齡
    // getAge(PetBornDate:Date , yearNorMonth:boolean): number {
    //     const today = new Date();
    //     let years = today.getFullYear() - PetBornDate.getFullYear();
    //     let months = today.getMonth() - PetBornDate.getMonth();

    //     // 如果月份差值為負數，表示今年還沒到生日，年齡要扣 1 歲，並加上 12 個月
    //     if (months < 0) {
    //         years--;
    //         months += 12;
    //     }

    //     if(yearNorMonth) {
    //         return years;
    //     } else {
    //         return months;
    //     }
    // }

    // //  試算保險費
    // CalculatePremium():number {
        
    //     let ageYear = this.getAge(this.PetBornDate , true);
    //     let ageMonth = this.getAge(this.PetBornDate , false);
    //     if(ageYear <= 8 && ageMonth < 6) {
    //         if(this.DogNorCat) {
    //             return 1508;
    //         } else {
    //             return 1200;
    //         }
    //     } else if(ageYear <= 10 && ageMonth < 6) {
    //         if(this.DogNorCat) {
    //             return 3329
    //         } else {
    //             return 2644;
    //         }
    //     } else if(ageYear <= 15 && ageMonth < 6 && this.Phrase != 1) {
    //         if(this.DogNorCat)  {
    //             return 4965;
    //         } else {
    //             return 3940;
    //         }

    //     } else {
    //         return 0;
    //     }
    // }

}