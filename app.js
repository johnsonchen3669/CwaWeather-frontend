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

function getWeatherIcon(weather) {
    if (!weather) return "🌤️";
    if (weather.includes("晴")) return "☀️";
    if (weather.includes("多雲")) return "⛅";
    if (weather.includes("陰")) return "☁️";
    if (weather.includes("雨")) return "🌧️";
    if (weather.includes("雷")) return "⛈️";
    return "🌤️";
}

function getAdvice(rainProb, maxTemp) {
    let rainIcon = "🌂";
    let rainText = "不用帶傘";
    if (parseInt(rainProb) > 30) {
        rainIcon = "☂️";
        rainText = "記得帶傘！";
    }

    let clothIcon = "👕";
    let clothText = "舒適穿搭";
    if (parseInt(maxTemp) >= 28) {
        clothIcon = "🎽";
        clothText = "短袖出發";
    } else if (parseInt(maxTemp) <= 20) {
        clothIcon = "🧥";
        clothText = "加件外套";
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
                    document.getElementById('locationDisplay').textContent = currentLocationName;
                    performFetch();
                },
                (error) => {
                    console.warn("無法取得位置，使用預設位置高雄", error);
                    performFetch(); // 使用預設高雄
                },
                options // 傳入設定選項
            );
        } else {
            console.warn("瀏覽器不支援地理位置");
            performFetch(); // 使用預設高雄
        }

        async function performFetch() {
            const API_URL = getAPIUrl(currentLocation);
            
            // 定義「最低等待時間」：1500 毫秒 (1.5秒)
            const delayPromise = new Promise(resolve => setTimeout(resolve, 1500));

            // 定義「抓取資料」的工作
            const fetchPromise = fetch(API_URL).then(res => res.json());

            // Promise.all 會等待「兩個都完成」才會往下走
            const [_, json] = await Promise.all([delayPromise, fetchPromise]);

            if (json.success) {
                renderWeather(json.data);

                // 資料處理好後，隱藏 Loading，顯示主畫面
                document.getElementById('loading').style.display = 'none';
                document.getElementById('mainContent').style.display = 'block';
            } else {
                throw new Error("API Error");
            }
        }
    } catch (e) {
        console.error(e);
        alert("天氣資料讀取失敗，狸克把網路線咬斷了！");
    }
}

document.addEventListener("DOMContentLoaded", fetchWeather);
