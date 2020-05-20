# Swapsies

Have an item you don't want anymore? You know how to cook/sing/code and could give an intro over video chat? On swapsies you'll find other people for swapping!

![](https://images.unsplash.com/photo-1579208575657-c595a05383b7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80)

## Running the app locally

Create `.env` file in your root directory and add the following code to it:

```
// .env
PORT=5555
SESSION_SECRET=littledragon
```
For handling image upload we are using Cloudinary. For it to work locally on your machine, you'd need to add the following to your `.env` file:

```
// .env
CLOUDINARY_NAME=cardib
CLOUDINARY_KEY=robyn
CLOUDINARY_SECRET=solange
```

In `client/` create another `.env` file in and add the following code to it:

```
// client/.env
SESSION_SECRET=warpaint
```


