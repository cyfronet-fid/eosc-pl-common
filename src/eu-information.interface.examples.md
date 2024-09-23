### Description

The information's about agreement made with UE.

### Component URLs

#### stable

https://s3.cloud.cyfronet.pl/eosc-pl-common/eu-information.production.css

https://s3.cloud.cyfronet.pl/eosc-pl-common/eu-information.production.js

#### latest

https://s3.cloud.cyfronet.pl/eosc-pl-common/latest/eu-information.production.css

https://s3.cloud.cyfronet.pl/eosc-pl-common/latest/eu-information.production.js

### Rendering examples

Render using class

```html
<div class="eosc-common-eu-information"></div>
```

Render using id

**IMPORTANT!!! Only first element with the id will be rendered!**

```html
<div id="eosc-common-eu-information"></div>
```

Render using camel case

```html
<EoscCommonEuInformation></EoscCommonEuInformation>
```

Render using snake case

```html
<eosc-common-eu-information></eosc-common-eu-information>
```

Render using build in tools

**IMPORTANT!!!**

- **Preferred for client side UI frameworks like Angular, AngularJS, ReactJS, VueJS, ...**
- **Attach script and styles in page header instead of the end of page body**

```html
<div id="custom-id"></div>
<script>
  window.eosccommon.renderEuInformation("#custom-id");
</script>

<div class="custom-class"></div>
<script>
  window.eosccommon.renderEuInformation(".custom-class");
</script>

<custom-tag></custom-tag>
<script>
  window.eosccommon.renderEuInformation("custom-tag");
</script>
```

### Examples

```js
<EoscCommonEuInformation></EoscCommonEuInformation>
```
