
const express = require("express");
const app = express();
const PORT = 8000;

app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept,X-Requested-With')
    res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
    res.header('X-Powered-By', ' 3.2.1')
    req.method == "OPTIONS" ? res.send(200) : next()
  });

app.get("/", (req, res) => {
    res.send("Hello express from a lightweight container");
});

// 传感器列表数组
const sensors = [
    { id: 1, name: '温度' },
    { id: 2, name: '湿度' },
    { id: 3, name: '压力' },
    { id: 4, name: '电压' },
    { id: 5, name: '电流' },
    { id: 6, name: '功率' },
    { id: 7, name: '功率因数' }
]
// 获取所有的传感器信息
app.get('/api/sensors', (req, res) => {
    res.send(sensors);
});

// 根据传感器id查询某个传感器
app.get('/api/sensors/:id', (req, res) => {
    console.log('new request');
    const sensor = sensors.find(c => c.id === parseInt(req.params.id));
    if (!sensor) { // 404
        return res.status(404).send('The sensor with the given ID was not found!');
    }
    res.send(sensor);
});

app.use(express.json());
// 提交一个传感器信息
app.post('/api/sensors', (req, res) => {
    //在提交前，对传感器名进行校验，若传感器名为空或者小于4个字符，则返回
    if (!req.body.name || req.body.name.length < 2) {
        // 400 Bad Request
        res.status(400).send('Name is required and should be minimum 4 characters.');
        return;
    }
    // 创建一个传感器对象
    const sensor = {
        id: sensors.length + 1,
        name: req.body.name
    };
    // 向传感器列表数组中添加一个新项
    sensors.push(sensor);
    res.send(sensor);
});

// 根据传感器id更新某个传感器
app.put('/api/sensors/:id', (req, res) => {
    // Look up the sensor
    // If not existing, return 404
    const sensor = sensors.find(c => c.id === parseInt(req.params.id));
    if (!sensor) { // 404
        return res.status(404).send('The sensor with the given ID was not found!');
    }
    // Validate
    // If invalid, return 400 - Bad request
    if (!req.body.name || req.body.name.length < 2) {
        // 400 Bad Request
        res.status(400).send('Name is required and should be minimum 4 characters.');
        return;
    }
    // Update sensor
    // Return the updated sensor
    sensor.name = req.body.name;
    res.send(sensor);
});

// 根据传感器id删除某个传感器
app.delete('/api/sensors/:id', (req, res) => {
    // Look up the sensor
    // Not existing, return 404
    const sensor = sensors.find(c => c.id === parseInt(req.params.id));
    if (!sensor) { // 404
        return res.status(404).send('The sensor with the given ID was not found!');
    }
    // Delete
    const index = sensors.indexOf(sensor);
    sensors.splice(index, 1);
    // Return the same sensor
    res.send(sensor);
})


app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));

// Export the Express API
module.exports = app;