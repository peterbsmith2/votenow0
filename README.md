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
    "name": "BELGIUM-COLD SPRINGS FIRE HOUSE",
    "fullAddress": "(RADISSON) 8451 LOOP RD BALDWINSVILLE NY 13027",
    "disabled": "This Polling Place is Accessible to the disabled",
    "town": "Lysander",
    "ward": "000",
    "district": "018",
    "school": null,
    "congress": "24th Congressional District",
    "senate": "50th Senatorial District",
    "assembly": "120th Assembly District",
    "otherDistrict1": null,
    "otherDistrict2": "1st County Legislative District",
    "otherDistrict3": null,
    "otherDistrict4": null
  }
}
```
