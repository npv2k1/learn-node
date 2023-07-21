const changeValue = (value: any) => (target: Object, propertyKey: string) => {
  Object.defineProperty(target, propertyKey, { value });
};

class Rocket {
  @changeValue(100)
  let fuel = 50;
}

const rocket = new Rocket();
console.log(rocket.fuel); // 100
