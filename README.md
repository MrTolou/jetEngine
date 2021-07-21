# jetEngine
## javascript element loader
 javascript page update engine

### What can it do?
it can update page or element content

it is so good for dinamic web sites

you can use it in sites or weblogs for update page content or pagination

### How to use it?
it's realy comfortable.

it has three methods

```javascript
_(element name (str), element node (int))
.Fade(time (int), percentage (int 1-100), complete)
.Load(
	page url (str), 
	element in page (str), 
	complete (function(fn)), 
	content or Element (true = content of selected element & false = selected element), 
	element node (int), 
	delete content (true = delete & false = add content)
)
```
### Example: 
```javascript
var EU = '.post';
var pageAddr = '?page=2';

_(EU).Fade(.4, 0, function(fn){
	// Fade element to 0 in 0.4 second
	fn.Load(pageAddr, '.content', function(fn){
		// load '.content' from 'pageAddr'
		fn.Fade(.4, 100, function(){
		// Fade _(EU) to 0 in 0.4 second
			alert(the content was load)
		})
	})
})
```
