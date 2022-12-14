mp.events.add("openChipsMenu", (data) => {
    if (!loggedin || chatActive || editing || cuffed || global.menuOpened) return;

    global.chipsMenu = mp.browsers.new('package://cef/components/casino_market/index.html');
    global.chipsMenu.active = true;
    global.menuOpen();
    
    data = JSON.parse(data);
    global.chipsMenu.execute(`CasinoMarket.chipbuy = ${data[0]}; CasinoMarket.chipsale = ${data[1]};`);
});

mp.events.add("closeChipsMenu", () => {
    if(global.chipsMenu != null)
    {
        global.menuClose();
        global.chipsMenu.active = false;
        global.chipsMenu.destroy();
    }
});

mp.events.add("casino:buyChips", (data) => {
    if (!loggedin || new Date().getTime() - lastCheck < 1000) return;
    lastCheck = new Date().getTime();

    mp.events.callRemote('casino.buyChips', data);
});
mp.events.add("casino:sellChips", (data) => {
    if (!loggedin || new Date().getTime() - lastCheck < 1000) return;
    lastCheck = new Date().getTime();

    data = parseInt(data);
    if (data === NaN || data < 1) return;

    mp.events.callRemote('casino.sellChips', data);
});