# votenow0
HackUpstate Hackathon Project

### POST 
#### Request
```
{
  "address": "235 Harrison St, Syracuse NY 13210"
  "geo": {
    "lat": NUMBER
    "lng": NUMBER
  }
}
```

### With Address Info
```
GET /api/v1/voter/:address
```

### With Geolocation Info
```
GET /api/v1/voter/geo/:lat/:lng
```

### Get raw geolocation info
```
GET /api/v1/voter/geo_raw/:lat/:lng
```

### The data that comes back
```
{
  "data": {
    "name": "MANLIUS VILLAGE CENTRE",
    "address": "ONE ARKIE ALBANESE AVE MANLIUS NY 13104 ",
    "disabled": "This Polling Place is Accessible to the disabled",
    "town": "Manlius",
    "district": {
      "main": "025",
      "congress": "24th Congressional District",
      "senate": "50th Senatorial District",
      "assembly": "127th Assembly District"
    }
  }
}
```
