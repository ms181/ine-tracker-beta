const savedata = (key, data) => {
  let res = {};
  if (
    localStorage.getItem(key) === null ||
    localStorage.getItem(key).length < 1
  ) {
    res[1] = data;
    localStorage.setItem(key, JSON.stringify(res));
  } else {
    res = JSON.parse(localStorage.getItem(key));
    const id = Object.keys(res).length + 1;
    res[id] = data;
    localStorage.setItem(key, JSON.stringify(res));
  }

  return localStorage.getItem(key);
};

const gettotal = (key) => {
  let total = 0;
  const data = JSON.parse(getdata(key));
  Object.keys(data).forEach((item) => {
    Object.keys(data[item]).forEach((i) => {
      total += i === "amount" ? +data[item][i] : 0;
    });
  });
  return total;
};

const gettotalbycategory = (key, categoryname) => {
  let total = 0;
  localStorage.getItem(key) !== null
    ? !localStorage.getItem(key).length && localStorage.setItem(key, "{}")
    : localStorage.setItem(key, "{}");
  if (categoryname !== "") {
    let returndt = Object.keys(JSON.parse(localStorage.getItem(key))).filter(
      (item) =>
        JSON.parse(localStorage.getItem(key))[item].category === categoryname
    );
    returndt.map((i) => {
      total += +JSON.parse(localStorage.getItem(key))[i]["amount"];
      return total;
    });
  } else {
    Object.keys(JSON.parse(localStorage.getItem(key))).map((i) => {
      total += +JSON.parse(localStorage.getItem(key))[i]["amount"];
      return total;
    });
  }
  return total;
};

const getdata = (key) => {
  localStorage.getItem(key) !== null
    ? !localStorage.getItem(key).length && localStorage.setItem(key, "{}")
    : localStorage.setItem(key, "{}");
  return localStorage.getItem(key);
};

const getdatabycategory = (key, categoryname) => {
  localStorage.getItem(key) !== null
    ? !localStorage.getItem(key).length && localStorage.setItem(key, "{}")
    : localStorage.setItem(key, "{}");
  if (categoryname !== "") {
    let returndt = Object.keys(JSON.parse(localStorage.getItem(key))).filter(
      (item) =>
        JSON.parse(localStorage.getItem(key))[item].category === categoryname
    );
    return JSON.stringify(
      returndt.map((i) => {
        return JSON.parse(localStorage.getItem(key))[i];
      })
    );
  } else {
    return localStorage.getItem(key);
  }
};

const deletedata = (key, item) => {
  let data = getdata(key);
  let newData = {};
  data = JSON.parse(data);
  delete data[item];
  Object.keys(data).forEach((key, index) => {
    newData[index] = data[key];
  });
  localStorage.setItem(key, JSON.stringify(newData));
  return JSON.stringify(newData);
};

const backup = async () => {
  let data = {},
    keys = Object.keys(localStorage);

  // eslint-disable-next-line array-callback-return
  keys.map((key) => {
    let res = JSON.parse(localStorage.getItem(key));
    data[key] = res;
  });
  console.log(JSON.parse(JSON.stringify(data)));

  var datastr = JSON.stringify(data);
  var element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(datastr)
  );
  element.setAttribute("download", "INE Tracker Backup.json");
  element.style.display = "none";
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};

const importdt = (dt) => {
  Object.keys(JSON.parse(dt)).map((item) => {
    return localStorage.setItem(item, JSON.stringify(JSON.parse(dt)[item]));
  });
  return 1;
};

export {
  savedata,
  getdata,
  getdatabycategory,
  backup,
  importdt,
  deletedata,
  gettotal,
  gettotalbycategory,
};
