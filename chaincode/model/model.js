
export class PetInfo {

  //  建構子 代表寵物的基本資料
  constructor(medicalNumber , name , species , breed , owner , phone , chip , birthday , gender , bloodType , ligation , allergy , majorDiseases , remark , hospital) {
    this.info = [
        {
            medicalNumber:medicalNumber,
            name:name,
            species : species,
            breed :breed,
            owner :owner,
            phone :phone,
            chip :chip,
            birthday :birthday,
            gender :gender,
            bloodType :bloodType,
            ligation :ligation,
            allergy :allergy,
            majorDiseases :majorDiseases,
            remark:remark,
            hospital:hospital,
        }
    ]
  
    this.record = []
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
// const pet = new PetInfo(100 , "大黃" , "狗" , "及娃娃" , "寒倒" , 0978 , 90 , "2010-2-20" , "雄性","A" , "是" , "蘑菇" , "腫瘤" , "抄肥瘠哇哇" , "台中動物醫院" );
// console.log(pet.data.length);
// console.log(pet);
// const petcon = new PetInfo();
// console.log(petcon);

// export default PetInfo;
