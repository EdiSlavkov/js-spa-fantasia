# Another homework - SPA for "Fantasia" fast food.

Some of the highlights:

- After first load of the SPA in LocalStorage will be created "fantasiausers" and "fantasialogin".

- User can't see the menu or basket before login.

- If the user is not registered, he can do so. The registration and user data are saved in LocalStorage and won't disappear after the browser is closed or refreshed.

- The registration form has the following validations:
 	1. Email - only a valid email can be accepted
	2. Username - a minimum of 6 letters with a message showing how many more are left
 	3. Password - must have at least 1 uppercase, 1 lowercase, 1 symbol/number and a password confirmation check 
	4. A check wether the username/email is already taken.

- After login the user will be transfered at the menu page.

- The user stays logged in until he clicks on the logout link or the LocalStorage is manually cleared.
- Once logged out - the basket will be cleared and  

	If the user does not click on the logout link, he will stay logged in until LocalStorage is cleared or the user clicks at the logout link. 
	After click on logout link - the basket will be cleared, LocalStorage.fantasialogin will be empty.

- The user can see their order history in the basket page after login, if there is no previous order - a message will appear.

- On the basket page, the user can remove products from their order or change the amounts and the totals will be recalculated accordingly.
