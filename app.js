const locations = {
    // 北部
    taipei: "台北市",
    newtaipei: "新北市",
    taoyuan: "桃園市",
    hsinchu: "新竹市",
    hsinchucounty: "新竹縣",
    miaoli: "苗栗縣",

    // 中部
    taichung: "台中市",
    nantou: "南投縣",
    changhua: "彰化縣",
    yunlin: "雲林縣",

    // 南部
    chiayi: "嘉義市",
    chiayi_county: "嘉義縣",
    tainan: "台南市",
    kaohsiung: "高雄市",
    pingtung: "屏東縣",

    // 東部
    yilan: "宜蘭縣",
    taitung: "台東縣",
    hualien: "花蓮縣",

    // 離島
    penghu: "澎湖縣",
    kinmen: "金門縣",
    lienchiang: "連江縣",
};

let currentLocation = "kaohsiung"; // 預設位置
let currentLocationName = "高雄市"; // 預設位置名稱

function getLocationFromCoordinates(latitude, longitude) {
    // 精確的台灣行政區域地理邊界資料
    console.log(`取得位置: ${latitude}, ${longitude}`);

    // 北部
    if (latitude >= 24.95 && latitude <= 25.25 && longitude >= 121.45 && longitude <= 121.65) {
        return "taipei"; // 台北市
    }
    if (latitude >= 24.85 && latitude <= 25.20 && longitude >= 121.20 && longitude <= 121.65) {
        return "newtaipei"; // 新北市
    }
    if (latitude >= 24.65 && latitude <= 25.15 && longitude >= 120.90 && longitude <= 121.30) {
        return "taoyuan"; // 桃園市
    }
    if (latitude >= 24.50 && latitude <= 24.85 && longitude >= 120.75 && longitude <= 121.10) {
        return "hsinchu"; // 新竹市
    }
    if (latitude >= 24.45 && latitude <= 24.75 && longitude >= 120.50 && longitude <= 120.90) {
        return "hsinchucounty"; // 新竹縣
    }
    if (latitude >= 24.25 && latitude <= 24.60 && longitude >= 120.45 && longitude <= 120.85) {
        return "miaoli"; // 苗栗縣
    }

    // 中部
    if (latitude >= 23.90 && latitude <= 24.40 && longitude >= 120.40 && longitude <= 120.80) {
        return "taichung"; // 台中市
    }
    if (latitude >= 23.50 && latitude <= 24.00 && longitude >= 120.40 && longitude <= 120.95) {
        return "nantou"; // 南投縣
    }
    if (latitude >= 23.70 && latitude <= 24.10 && longitude >= 120.30 && longitude <= 120.75) {
        return "changhua"; // 彰化縣
    }
    if (latitude >= 23.40 && latitude <= 23.90 && longitude >= 120.00 && longitude <= 120.65) {
        return "yunlin"; // 雲林縣
    }

    // 南部
    if (latitude >= 23.25 && latitude <= 23.55 && longitude >= 120.25 && longitude <= 120.60) {
        return "chiayi"; // 嘉義市
    }
    if (latitude >= 23.05 && latitude <= 23.45 && longitude >= 120.15 && longitude <= 120.60) {
        return "chiayi_county"; // 嘉義縣
    }
    if (latitude >= 22.75 && latitude <= 23.25 && longitude >= 120.00 && longitude <= 120.50) {
        return "tainan"; // 台南市
    }
    if (latitude >= 22.30 && latitude <= 22.90 && longitude >= 120.00 && longitude <= 120.65) {
        return "kaohsiung"; // 高雄市
    }
    if (latitude >= 22.00 && latitude <= 22.50 && longitude >= 120.30 && longitude <= 120.85) {
        return "pingtung"; // 屏東縣
    }

    // 東部
    if (latitude >= 24.50 && latitude <= 24.90 && longitude >= 121.80 && longitude <= 122.10) {
        return "yilan"; // 宜蘭縣
    }
    if (latitude >= 23.80 && latitude <= 24.35 && longitude >= 121.30 && longitude <= 121.85) {
        return "hualien"; // 花蓮縣
    }
    if (latitude >= 22.75 && latitude <= 23.35 && longitude >= 120.95 && longitude <= 121.50) {
        return "taitung"; // 台東縣
    }

    // 離島
    if (latitude >= 23.50 && latitude <= 23.90 && longitude >= 119.40 && longitude <= 119.80) {
        return "penghu"; // 澎湖縣
    }
    if (latitude >= 24.35 && latitude <= 24.55 && longitude >= 118.25 && longitude <= 118.50) {
        return "kinmen"; // 金門縣
    }
    if (latitude >= 26.05 && latitude <= 26.35 && longitude >= 119.85 && longitude <= 120.20) {
        return "lienchiang"; // 連江縣
    }

    // 預設高雄
    return "kaohsiung";
}

function getAPIUrl(location) {
    return `https://johnson-cwaweather-backend.zeabur.app/api/weather/${location}`;
}

function getLocationDisplayName(locationKey) {
    return locations[locationKey] || "高雄市";
}

function initLocationSelect() {
    const select = document.getElementById('locationSelect');
    if (!select) return;
    
    // 如果已經有實例，先銷毀
    if (window.choicesInstance) {
        window.choicesInstance.destroy();
    }

    select.innerHTML = '';
    for (const [key, name] of Object.entries(locations)) {
        const option = document.createElement('option');
        option.value = key;
        option.textContent = name;
        select.appendChild(option);
    }

    // 初始化 Choices.js
    window.choicesInstance = new Choices(select, {
        searchEnabled: false,
        itemSelectText: '',
        shouldSort: false,
        position: 'bottom',
    });

    // 監聽切換事件
    select.addEventListener('change', (e) => {
        currentLocation = e.target.value;
        currentLocationName = locations[currentLocation];
        // 重新抓取天氣，顯示 Loading 效果
        performFetch(true); 
    });
}

const ICONS = {
    sun: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 9c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58a.996.996 0 00-1.41 0 .996.996 0 000 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37a.996.996 0 00-1.41 0 .996.996 0 000 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96a.996.996 0 000-1.41.996.996 0 00-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36a.996.996 0 000 1.41.996.996 0 001.41 0l1.06-1.06c.39-.39.39-1.03 0-1.41s-1.03-.39-1.41 0l-1.06 1.06z"/></svg>`,
    cloud: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4 0-2.05 1.53-3.76 3.56-3.97l1.07-.11.5-.95C8.08 7.14 9.94 6 12 6c2.62 0 4.88 1.86 5.39 4.43l.3 1.5 1.53.11c1.56.1 2.78 1.41 2.78 2.96 0 1.65-1.35 3-3 3z"/></svg>`,
    rain: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 4c-2.62 0-4.88 1.86-5.39 4.43l-.3 1.5-1.53.11C2.78 10.14 1.56 11.45 1.56 13c0 1.65 1.35 3 3 3h13c1.65 0 3-1.35 3-3 0-1.55-1.22-2.86-2.78-2.96l-1.53-.11-.3-1.5C16.88 5.86 14.62 4 12 4zm0-2c3.64 0 6.67 2.59 7.35 6.04 2.6.18 4.65 2.32 4.65 4.96 0 2.76-2.24 5-5 5H6c-3.31 0-6-2.69-6-6 0-3.09 2.34-5.64 5.35-5.96C6.6 3.64 9.11 2 12 2zM8 17h2v4H8v-4zm4 0h2v4h-2v-4zm4 0h2v4h-2v-4z"/></svg>`,
    thunder: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C9.11 2 6.6 3.64 5.35 6.04 2.34 6.36 0 8.91 0 12c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96C18.67 4.59 15.64 2 12 2zm0 2c2.62 0 4.88 1.86 5.39 4.43l.3 1.5 1.53.11c1.56.1 2.78 1.41 2.78 2.96 0 1.65-1.35 3-3 3H6c-2.21 0-4-1.79-4-4 0-2.05 1.53-3.76 3.56-3.97l1.07-.11.5-.95C8.08 3.14 9.94 2 12 2zm-1 14h2l-1 4 3-6h-2l1-4-3 6z"/></svg>`,
    umbrella: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12c0 .68.09 1.34.24 1.97.15.63.38 1.23.68 1.78l.15.25h17.86l.15-.25c.3-.55.53-1.15.68-1.78.15-.63.24-1.29.24-1.97 0-5.52-4.48-10-10-10zm0 2c4.42 0 8 3.58 8 8 0 .4-.04.79-.1 1.17-.06.38-.16.74-.29 1.08H4.39c-.13-.34-.23-.7-.29-1.08C4.04 12.79 4 12.4 4 12c0-4.42 3.58-8 8-8zm-1 13v3c0 .55-.45 1-1 1s-1-.45-1-1v-1H7v1c0 1.66 1.34 3 3 3s3-1.34 3-3v-3h-2z"/></svg>`,
    tshirt: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2c-1.1 0-2 .9-2 2 0 .55.22 1.05.58 1.41L5 9v11c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V9l-5.58-3.59c.36-.36.58-.86.58-1.41 0-1.1-.9-2-2-2h-4zm0 2h4c0 .55-.45 1-1 1s-1-.45-1-1-1 .45-1 1-.45 1-1 1-1-.45-1-1zM6 10l5-3.5V20H7v-8H6v-2zm12 0v2h-1v8h-4V6.5l5 3.5z"/></svg>`,
    coat: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C9.8 2 8 3.8 8 6v2H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V8h-2V6c0-2.2-1.8-4-4-4zm0 2c1.1 0 2 .9 2 2v2h-4V6c0-1.1.9-2 2-2zm-4 6h2v10H8V10zm6 0h2v10h-2V10z"/></svg>`,
    comfortable: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 2c4.41 0 8 3.59 8 8s-3.59 8-8 8-8-3.59-8-8 3.59-8 8-8zm-1 4v6h2V8h-2z"/></svg>`
};

function getWeatherIcon(weather) {
    if (!weather) return ICONS.sun;
    if (weather.includes("晴")) return ICONS.sun;
    if (weather.includes("多雲")) return ICONS.cloud;
    if (weather.includes("陰")) return ICONS.cloud;
    if (weather.includes("雨")) return ICONS.rain;
    if (weather.includes("雷")) return ICONS.thunder;
    return ICONS.sun;
}

function getAdvice(rainProb, maxTemp) {
    let rainIcon = ICONS.umbrella;
    let rainText = "觀測正常";
    if (parseInt(rainProb) > 30) {
        rainText = "降雨警報！";
    }

    let clothIcon = ICONS.comfortable;
    let clothText = "氣候安定";
    if (parseInt(maxTemp) >= 28) {
        clothIcon = ICONS.tshirt;
        clothText = "熱血沸騰！";
    } else if (parseInt(maxTemp) <= 20) {
        clothIcon = ICONS.coat;
        clothText = "寒冷前線！";
    }

    return { rainIcon, rainText, clothIcon, clothText };
}

function getTimePeriod(startTime) {
    const hour = new Date(startTime).getHours();
    if (hour >= 5 && hour < 11) return "早晨";
    if (hour >= 11 && hour < 14) return "中午";
    if (hour >= 14 && hour < 18) return "下午";
    if (hour >= 18 && hour < 23) return "晚上";
    return "深夜";
}

function renderWeather(data) {
    const forecasts = data.forecasts;
    const current = forecasts[0];
    const others = forecasts.slice(1);

    // 1. 渲染 Hero Card (主畫面)
    const advice = getAdvice(current.rain, current.maxTemp);
    const period = getTimePeriod(current.startTime);
    const avgTemp = Math.round((parseInt(current.maxTemp) + parseInt(current.minTemp)) / 2);

    document.getElementById('heroCard').innerHTML = `
        <div class="hero-card">
            <div class="hero-period">${period}</div>
            <div class="hero-temp-container">
                <div class="hero-icon">${getWeatherIcon(current.weather)}</div>
                <div class="hero-temp">${avgTemp}°</div>
            </div>
            <div class="hero-desc">${current.weather}</div>
            
            <div class="advice-grid">
                <div class="advice-item">
                    <div class="advice-icon">${advice.rainIcon}</div>
                    <div class="advice-text">${advice.rainText}</div>
                    <div style="font-size:0.7rem; color:#999">降雨率 ${current.rain}</div>
                </div>
                <div class="advice-item">
                    <div class="advice-icon">${advice.clothIcon}</div>
                    <div class="advice-text">${advice.clothText}</div>
                    <div style="font-size:0.7rem; color:#999">最高溫 ${current.maxTemp}°</div>
                </div>
            </div>
        </div>
    `;

    // 2. 渲染稍後預報 (包含明天判斷)
    const scrollContainer = document.getElementById('futureForecasts');
    scrollContainer.innerHTML = '';

    // 抓今天的日期數字 (例如 24)
    const todayDate = new Date().getDate();

    others.forEach(f => {
        let p = getTimePeriod(f.startTime);

        // 判斷該預報的日期是否跟今天不同，不同就是明天
        const fDate = new Date(f.startTime);
        if (fDate.getDate() !== todayDate) {
            p = "明天" + p;
        }

        scrollContainer.innerHTML += `
            <div class="mini-card">
                <div class="mini-time">${p}</div>
                <div class="mini-icon">${getWeatherIcon(f.weather)}</div>
                <div class="mini-temp">${f.minTemp}° - ${f.maxTemp}°</div>
                <div style="font-size:0.8rem; color:#888; margin-top:5px;">💧${f.rain}</div>
            </div>
        `;
    });

    // 3. 右上角顯示今日日期
    const now = new Date();
    const month = now.getMonth() + 1;
    const date = now.getDate();
    const dayIndex = now.getDay();
    const days = ["週日", "週一", "週二", "週三", "週四", "週五", "週六"];

    document.getElementById('updateTime').textContent = `${month}月${date}日 ${days[dayIndex]}`;
}

async function fetchWeather() {
    // 初始化下拉選單
    initLocationSelect();

    try {
        // 1. 取得使用者位置 (啟用高精度)
        if (navigator.geolocation) {
            const options = {
                enableHighAccuracy: true, // 啟用高精度定位 (使用 GPS)
                timeout: 5000,            // 超時設定 (毫秒)
                maximumAge: 0             // 不使用快取位置
            };

            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    currentLocation = getLocationFromCoordinates(latitude, longitude);
                    currentLocationName = getLocationDisplayName(currentLocation);
                    
                    // 更新下拉選單的值 (使用 Choices.js API)
                    if (window.choicesInstance) {
                        window.choicesInstance.setChoiceByValue(currentLocation);
                    }

                    performFetch(true);
                },
                (error) => {
                    console.warn("無法取得位置，使用預設位置高雄", error);
                    performFetch(true); // 使用預設高雄
                },
                options // 傳入設定選項
            );
        } else {
            console.warn("瀏覽器不支援地理位置");
            performFetch(true); // 使用預設高雄
        }
    } catch (e) {
        console.error(e);
        alert("天氣資料讀取失敗，請稍後再試。");
    }
}

async function performFetch(showLoading = true) {
    if (showLoading) {
        const loadingEl = document.getElementById('loading');
        if(loadingEl) loadingEl.style.display = 'flex';
        const mainContent = document.getElementById('mainContent');
        if(mainContent) mainContent.style.display = 'none';
    }

    const API_URL = getAPIUrl(currentLocation);
    
    // 定義「最低等待時間」：1500 毫秒 (1.5秒)
    const delayPromise = new Promise(resolve => setTimeout(resolve, 1500));

    // 定義「抓取資料」的工作
    const fetchPromise = fetch(API_URL).then(res => res.json());

    try {
        // Promise.all 會等待「兩個都完成」才會往下走
        const [_, json] = await Promise.all([delayPromise, fetchPromise]);

        if (json.success) {
            renderWeather(json.data);

            // 資料處理好後，隱藏 Loading，顯示主畫面
            const loadingEl = document.getElementById('loading');
            if(loadingEl) loadingEl.style.display = 'none';
            const mainContent = document.getElementById('mainContent');
            if(mainContent) mainContent.style.display = 'block';
        } else {
            throw new Error("API Error");
        }
    } catch (e) {
        console.error(e);
        alert("天氣資料讀取失敗，請稍後再試。");
        const loadingEl = document.getElementById('loading');
        if(loadingEl) loadingEl.style.display = 'none';
    }
}

document.addEventListener("DOMContentLoaded", fetchWeather);
