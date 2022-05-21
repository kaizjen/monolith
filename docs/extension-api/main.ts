/// <reference path="mth-types.d.ts" />

monolith.tabs.onNewTabCreated(async(tab) => {
  let wc = await tab.getWebContents();
  wc.executeJavaScript(`

  `)
});

(async()=>{
  
  monolith.ui.changeColorTheme({
    bg: 'red'
  })

})
