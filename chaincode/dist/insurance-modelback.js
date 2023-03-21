"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PetInsuranceSC = void 0;
class PetInsuranceSC {
    //  計算年齡
    getAge(birthDate, yearNorMonth) {
        const today = new Date();
        let years = today.getFullYear() - birthDate.getFullYear();
        let months = today.getMonth() - birthDate.getMonth();
        // 如果月份差值為負數，表示今年還沒到生日，年齡要扣 1 歲，並加上 12 個月
        if (months < 0) {
            years--;
            months += 12;
        }
        if (yearNorMonth) {
            return years;
        }
        else {
            return months;
        }
    }
    //  試算保險費
    CalculatePremium(DogNorCat, BornDate) {
        this.ForPet.DogNorCat = DogNorCat;
        this.ForPet.ageYear = this.getAge(BornDate, true);
        this.ForPet.ageMonth = this.getAge(BornDate, false);
        if (this.ForPet.ageYear <= 8 && this.ForPet.ageMonth < 6) {
            if (DogNorCat) {
                return 1508;
            }
            else {
                return 1200;
            }
        }
        else if (this.ForPet.ageYear <= 10 && this.ForPet.ageMonth < 6) {
            if (DogNorCat) {
                return 3329;
            }
            else {
                return 2644;
            }
        }
        else if (this.ForPet.ageYear <= 15 && this.ForPet.ageMonth < 6 && this.Contract.Phrase != 1) {
            if (DogNorCat) {
                return 4965;
            }
            else {
                return 3940;
            }
        }
        else {
            return 0;
        }
    }
}
exports.PetInsuranceSC = PetInsuranceSC;
//# sourceMappingURL=insurance-modelback.js.map