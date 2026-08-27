### Description

Common EOSC header at top of the application.

### Component URLs

#### stable

https://s3.cloud.cyfronet.pl/eosc-pl-common/main-header.production.css

https://s3.cloud.cyfronet.pl/eosc-pl-common/main-header.production.js

#### latest

https://s3.cloud.cyfronet.pl/eosc-pl-common/latest/main-header.production.css

https://s3.cloud.cyfronet.pl/eosc-pl-common/latest/main-header.production.js

### Rendering examples

Render using class

```html
<div
  class="eosc-common-main-header"
  username="name surname"
  login-url="https://marketplace.eosc.pl/users/auth/checkin"
  logout-url="https://marketplace.eosc.pl/users/logout"
></div>
```

Render using id

**IMPORTANT!!! Only first element with the id will be rendered!**

```html
<div
  id="eosc-common-main-header"
  username="name surname"
  login-url="https://marketplace.eosc.pl/users/auth/checkin"
  logout-url="https://marketplace.eosc.pl/users/logout"
></div>
```

Render using camel case

```html
<EoscCommonMainHeader
  username="name surname"
  login-url="https://marketplace.eosc.pl/users/auth/checkin"
  logout-url="https://marketplace.eosc.pl/users/logout"
></EoscCommonMainHeader>
```

Render using snake case

```html
<eosc-common-main-header
  username="name surname"
  login-url="https://marketplace.eosc.pl/users/auth/checkin"
  logout-url="https://marketplace.eosc.pl/users/logout"
></eosc-common-main-header>
```

Render using build in tools

**IMPORTANT!!!**

- **Preferred for client side UI frameworks like Angular, AngularJS, ReactJS, VueJS, ...**
- **Attach script and styles in page header instead of the end of page body**

```html
<div
  id="custom-id"
  username="name surname"
  login-url="https://marketplace.eosc.pl/users/auth/checkin"
  logout-url="https://marketplace.eosc.pl/users/logout"
></div>
<script>
  window.eosccommon.renderMainHeader("#custom-id");
</script>

<div
  class="custom-class"
  username="name surname"
  login-url="https://marketplace.eosc.pl/users/auth/checkin"
  logout-url="https://marketplace.eosc.pl/users/logout"
></div>
<script>
  window.eosccommon.renderMainHeader(".custom-class");
</script>

<custom-tag
  username="name surname"
  login-url="https://marketplace.eosc.pl/users/auth/checkin"
  logout-url="https://marketplace.eosc.pl/users/logout"
></custom-tag>
<script>
  window.eosccommon.renderMainHeader("custom-tag");
</script>

<custom-tag></custom-tag>
<script>
  window.eosccommon.renderMainHeader("custom-tag", {
    username: "name username",
    "login-url": "https://marketplace.eosc.pl/users/auth/checkin",
    "logout-url": "https://marketplace.eosc.pl/users/logout",
  });
</script>
```

Render using data attributes

**IMPORTANT!!! Preferred for client side UI frameworks like Angular, AngularJS, ReactJS, VueJS, ...**

```html
<div
  class="eosc-common-main-header"
  data-username="name surname"
  data-login-url="https://marketplace.eosc.pl/users/auth/checkin"
  data-logout-url="https://marketplace.eosc.pl/users/logout"
></div>
```

### Working examples

The user isn't logged in

```js
<EoscCommonMainHeader
  username=""
  login-url="https://marketplace.eosc.pl/users/auth/checkin"
  logout-url="https://marketplace.eosc.pl/users/logout"
></EoscCommonMainHeader>
```

A user is logged

```js
<EoscCommonMainHeader
  username="name surname"
  login-url="https://marketplace.eosc.pl/users/auth/checkin"
  logout-url="https://marketplace.eosc.pl/users/logout"
></EoscCommonMainHeader>
```

Handle onLogin with event argument (substitute of loginUrl)

```js
<EoscCommonMainHeader
  username=""
  on-login="alert($event.type + 'on login btn')"
  logout-url="https://marketplace.eosc.pl/users/logout"
></EoscCommonMainHeader>
```

Handle onLogout with event argument (substitute of logoutUrl)

```js
<EoscCommonMainHeader
  username="name surname"
  on-logout="alert($event.type + ' on logout btn')"
  login-url="https://marketplace.eosc.pl/users/auth/checkin"
></EoscCommonMainHeader>
```

Handle multiple callbacks in onLogout (substitute of logoutUrl)

```js
<EoscCommonMainHeader
  username="name surname"
  on-logout="alert('logout btn'); alert('second call'); alert($event.type)"
  login-url="https://marketplace.eosc.pl/users/auth/checkin"
></EoscCommonMainHeader>
```

Customize profile links

```js
<EoscCommonMainHeader
  username="John Doe"
  on-logout="alert('logout btn');"
  login-url="https://marketplace.eosc.pl/users/auth/checkin"
  profile-links='[{"href": "https://eosc.pl", "caption": "Discovery Hub"}, {"href": "#", "caption": "Custom link #2"}]'
></EoscCommonMainHeader>
```

Handle all missing params

```js
<EoscCommonMainHeader></EoscCommonMainHeader>
```

Use default eosc links

```js
<EoscCommonMainHeader
  username="John Doe"
  on-logout="alert('logout btn');"
  login-url="https://marketplace.eosc.pl/users/auth/checkin"
  show-eosc-links="true"
></EoscCommonMainHeader>
```


Use default eosc links with custom links defined via `profile-links`

```js
<EoscCommonMainHeader
  username="John Doe"
  on-logout="alert('logout btn');"
  login-url="https://marketplace.eosc.pl/users/auth/checkin"
  show-eosc-links="true"
  profile-links='[{"href": "https://eosc.pl", "caption": "EOSC PL Discovery Hub"}]'
></EoscCommonMainHeader>
```

Use default eosc links with custom tab defined via `custom-tabs`

```js
<EoscCommonMainHeader
    username="John Doe"
    on-logout="alert('logout btn');"
    login-url="https://marketplace.eosc.pl/users/auth/checkin"
    show-eosc-links="true"
    custom-tabs='[{"id":"provider","name":"Provider","links":[{"caption":"Backoffice","href":"https://marketplace.eosc.pl/backoffice/services"},{"caption":"Ordering system","href":"https://bos.eosc.pl/","dividerAfter":true},{"caption":"+ Add new service","href":"https://marketplace.eosc.pl/backoffice/services/new"},{"caption":"+ Add new provider","href":"https://marketplace.eosc.pl/backoffice/providers/new/wizard"},{"caption":"+ Add new catalogue","href":"https://marketplace.eosc.pl/backoffice/catalogues/new","dividerAfter":true},{"caption":"Documentation","href":"#"}]}]'
></EoscCommonMainHeader>
```

#### Introducing user-roles

Use provider user roles (`admin` / `coordinator` / `executive`) for default provider custom tabs view:

```js
<EoscCommonMainHeader
    username="John Doe"
    user-roles='["admin"]'
    show-eosc-links="true"
    on-logout="alert('logout btn');"
    login-url="https://marketplace.eosc.pl/users/auth/checkin"
></EoscCommonMainHeader>
```

Use empty array or any other values than admin/coordinator/executive for default custom tabs:

```js
<EoscCommonMainHeader
    username="John Doe"
    user-roles='["nonexisting_role"]'
    show-eosc-links="true"
    on-logout="alert('logout btn');"
    login-url="https://marketplace.eosc.pl/users/auth/checkin"
></EoscCommonMainHeader>
```

Use provider user roles with custom provider tabs defined via `provider-custom-tabs`:

```js
<EoscCommonMainHeader
    username="John Doe"
    user-roles='["coordinator"]'
    show-eosc-links="true"
    provider-custom-tabs='[{"id":"custom-provider","name":"Provider","links":[{"caption":"Custom Provider Link","href":"https://example.com"}]}]'
    custom-tabs='[{"id":"custom-provider","name":"Provider","links":[{"caption":"Custom User Link","href":"https://example.com"}]}]'
    on-logout="alert('logout btn');"
    login-url="https://marketplace.eosc.pl/users/auth/checkin"
></EoscCommonMainHeader>
```

Use user roles with custom provider tabs defined via `custom-tabs`:

```js
<EoscCommonMainHeader
    username="John Doe"
    user-roles='["someuser"]'
    show-eosc-links="true"
    provider-custom-tabs='[{"id":"custom-provider","name":"Provider","links":[{"caption":"Custom Provider Link","href":"https://example.com"}]}]'
    custom-tabs='[{"id":"custom-provider","name":"Provider","links":[{"caption":"Custom User Link","href":"https://example.com"}]}]'
    on-logout="alert('logout btn');"
    login-url="https://marketplace.eosc.pl/users/auth/checkin"
></EoscCommonMainHeader>
```

#### If the user-roles array contains one or more of the following roles admin, provider, or executive, the field provider-custom-tabs is used. Otherwise, custom-tabs is used.
#### Both fields have default values, which can be overridden by providing a value for the respective field in the component.
