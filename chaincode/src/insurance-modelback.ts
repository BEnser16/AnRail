
export class PetInsuranceSC {
    public docType?:string;

    public ID:string;

    public Contract:{
        Phrase:number;
        State:string;
        StartContractDate:string;
        EndContractDate:string;
    }

    public Proposer:{
        Name:string;
        ID:string;
        BornDate:Date;
        PhoneNumber:string;
        Email:string;
    }

    public ForPet:{
        DogNorCat:boolean;
        PetName:string;
        ChipID:string;
        BornDate:Date;
        ageYear:number;
        ageMonth:number;
    }

    //  計算年齡
    public getAge(birthDate:Date , yearNorMonth:boolean): number {
        const today = new Date();
        let years = today.getFullYear() - birthDate.getFullYear();
        let months = today.getMonth() - birthDate.getMonth();

        // 如果月份差值為負數，表示今年還沒到生日，年齡要扣 1 歲，並加上 12 個月
        if (months < 0) {
            years--;
            months += 12;
        }

        if(yearNorMonth) {
            return years;
        } else {
            return months;
        }
    }

    //  試算保險費
    public CalculatePremium(DogNorCat:boolean , BornDate:Date):number {
        this.ForPet.DogNorCat = DogNorCat;
        this.ForPet.ageYear = this.getAge(BornDate , true);
        this.ForPet.ageMonth = this.getAge(BornDate , false);
        if(this.ForPet.ageYear <= 8 && this.ForPet.ageMonth < 6) {
            if(DogNorCat) {
                return 1508;
            } else {
                return 1200;
            }
        } else if(this.ForPet.ageYear <= 10 && this.ForPet.ageMonth < 6) {
            if(DogNorCat) {
                return 3329
            } else {
                return 2644;
            }
        } else if(this.ForPet.ageYear <= 15 && this.ForPet.ageMonth < 6 && this.Contract.Phrase != 1) {
            if(DogNorCat)  {
                return 4965;
            } else {
                return 3940;
            }

        } else {
            return 0;
        }
    }

    
}