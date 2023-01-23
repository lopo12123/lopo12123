type BaseInfo = {
    name: string
    dob: string
    job: string
}
const baseInfo: BaseInfo = {
    name: 'lopo',
    dob: '1999.01.24',
    job: 'front-end developer',
}

type Language = 'js' | 'ts' | 'rust' | 'dart' | 'json' | 'toml'
export type DescInLang = {
    lang: Language
    code: string
}

const descInJs: DescInLang = {
    lang: 'js',
    code: `function Me() {
    this.name = 'lopo'
    this.dob = '1999.01.24'
    this.job = 'front-end developer'

    this.greet = () => {
        console.log('Hi there!')
    }
}

const me = new Me()
me.greet()`
}

const descInTs: DescInLang = {
    lang: 'ts',
    code: `class Me {
    public name: string = 'lopo'
    public dob: string = '1999.01.24'
    public job: string = 'front-end developer'

    public greet(): void {
        console.log('Hi there!')
    }
}

const me = new Me()
me.greet()`
}

const descInRust: DescInLang = {
    lang: 'rust',
    code: `#[allow(unused)]
struct Me {
    pub name: &'static str,
    pub dob: &'static str,
    pub job: String,
}

#[allow(unused)]
impl Me {
    pub fn new() -> Self {
        Me {
            name: "lopo",
            dob: "1999.01.24",
            job: "front-end developer".to_string(),
        }
    }

    pub fn greet(&self) {
        print!("Hi there!");
    }
}

#[cfg(test)]
mod test {
    use super::*;

    #[test]
    fn main() {
        let me = Me::new();
        me.greet();
    }
}`
}

const descInDart: DescInLang = {
    lang: 'dart',
    code: `class Me {
  final String name = "lopo";
  final String dob = "1999.01.24";
  String job = "front-end developer";

  void greet() {
    // ignore_for_file: avoid_print
    print("Hi there!");
  }
}

void main() {
  var me = Me();
  me.greet();
}`
}

const descInJson: DescInLang = {
    lang: 'json',
    code: `{
    "me": {
        "name": "lopo",
        "dob": "1999.01.24",
        "job": "front-end developer"
    }
}`
}
const descInToml: DescInLang = {
    lang: 'toml',
    code: `[me]
name = "lopo"
dob = "1999.01.24"
job = "front-end developer"`
}

const descInLangs: DescInLang[] = [
    descInRust, descInJs, descInTs, descInDart, descInJson, descInToml
]

const iconsOfDesc = [
    {class: 'icon-rust', title: 'rust'},
    {class: 'icon-js', title: 'javascript'},
    {class: 'icon-ts', title: 'typescript'},
    {class: 'icon-dart', title: 'dart'},
    {class: 'icon-json', title: 'json'},
    {class: 'icon-toml', title: 'toml'},
]

export {
    descInLangs, iconsOfDesc
}