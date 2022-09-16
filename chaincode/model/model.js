
//  定義寵物資料結構
class PetInfo {

    //  建構子 代表寵物的基本資料
    constructor(medicalNumber , name , species , breed , owner , phone , chip , birthday , gender , bloodType , ligation , allergy , majorDiseases , remark , hospital) {
      [
        this.medicalNumber = medicalNumber,
        this.name = name,
        this.species = species,
        this.breed = breed,
        this.owner = owner,
        this.phone = phone,
        this.chip = chip,
        this.birthday = birthday,
        this.gender = gender,
        this.bloodType = bloodType,
        this.ligation = ligation,
        this.allergy = allergy,
        this.majorDiseases = majorDiseases,
        this.remark = remark,
        this.hospital = hospital,
        this.record = []
      ]
    }

    //  建構寵物的醫療紀錄
    AddRecord(date , doctor , type , describe , complete) {
        this.record = [
            date,
            doctor,
            type,
            describe,
            complete
        ]
        
    }
}
const pet = new PetInfo(100 , "大黃" , "狗" , "及娃娃" , "寒倒" , 0978 , 90 , "2010-2-20" , "雄性","A" , "是" , "蘑菇" , "腫瘤" , "抄肥瘠哇哇" , "台中動物醫院" );
console.log(pet.length);


// export default PetInfo;
