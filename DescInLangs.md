```javascript
function Me() {
    this.name = 'lopo'
    this.dob = '1999.01.24'
    this.job = 'front-end developer'

    this.greet = () => {
        console.log('Hi there!')
    }
}

const me = new Me()
me.greet()
```

```typescript
class Me {
    public name: string = 'lopo'
    public dob: string = '1999.01.24'
    public job: string = 'front-end developer'

    public greet(): void {
        console.log('Hi there!')
    }
}

const me = new Me()
me.greet()
```

```rust
#[allow(unused)]
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
}
```

```dart
class Me {
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
}
```