class MobilePhoneFactory {
  createOS() {
    throw new Error('抽象工厂方法不允许直接调用，你需要将我重写')
  }
  createHardWare() {
    throw new Error('抽象工厂方法不允许直接调用，你需要将我重写')
  }
}

// FakeStar为手机型号
class FakeStarFactory extends MobilePhoneFactory {
  // NOTE: 如果子类也拥有和父类一样的方法，子类方法优先
  // NOTE: AndroidOS和QualcommHardWare被称为具体产品类
  createOS() {
    // 提供安卓系统实例
    return new AndroidOS()
  }
  createHardWare() {
    // 提供高通硬件实例
    return new QualcommHardWare()
  }
}

/** --------- */

class OS {
  controlHardWare() {
    throw new Error('抽象产品方法不允许直接调用，你需要将我重写')
  }
}

class AppleOS extends OS {
  controlHardWare() {
    console.log('用苹果的方式操作硬件')
  }
}

class AndroidOS extends OS {
  controlHardWare() {
    console.log('用安卓的方式操作硬件')
  }
}

/** ----------- */

class HardWare {
  // 手机硬件的共性方法，这里提取了“根据命令运转”这个共性
  operateByOrder() {
    throw new Error('抽象产品方法不允许直接调用，你需要将我重写！');
  }
}

class QualcommHardWare extends HardWare {
  operateByOrder() {
      console.log('我会用高通的方式去运转')
  }
}

class MiWare extends HardWare {
  operateByOrder() {
      console.log('我会用小米的方式去运转')
  }
}

/** ------ */

// 一部手机
const myPhone = new FakeStarFactory()
const myOS = myPhone.createOS()
const myHardWare = myPhone.createHardWare()

myOS.controlHardWare() // 启动操作系统
myHardWare.operateByOrder() // 唤醒硬件

/** ------ */

// 新型号手机
class NewStarFactory extends MobilePhoneFactory {
  createOS() {
    // 提供系统实例
  }
  createHardWare() {
    // 提供硬件实例
  }
}
