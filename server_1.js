var express         =         require("express");
var mysql           =         require("mysql");
var app             =         express();

/*
  * Configure MySQL parameters.
*/
var connection      =         mysql.createConnection({
        host        :         "localhost",
        user        :         "root",
        password    :         "",
        database     :         "phonecatapp"
});

connection.connect(function(error){
  if(error)
    {
      console.log("Problem with MySQL"+error);
    }
  else
    {
      console.log("Connected with Database");
    }
});

/*
  * Configure Express Server.
*/
app.use(express.static(__dirname + '/app'));
app.use(express.static(__dirname + '/js'));
app.use(express.static(__dirname + '/css'));
app.use(express.static(__dirname + '/partials'));
app.use(express.static(__dirname + '/img'));
/*
  * Define routing of the application.
*/
app.get('/',function(req,res){
  res.sendfile('index.html');
});

//DISPLAYING PHONELIST
app.get('/phonelist',function(req,res){
  connection.query("SELECT * from phones", function(err,rows,fields){
    if(err)
      {
        console.log("Problem with MySQL"+err);
      }
      else
        {
          res.end(JSON.stringify(rows));
        }
  });
});

//DISPLAYING PHONE DETAILS
app.get('/phoneboard/:id', function(req, res){
 var id = req.params.id;
  connection.query("SELECT p.phoneId, p.age, p.carrier, p.id, p.imageUrl, p.name, p.snippet, p.additionalFeatures, p.description, " +
		"android.os, android.ui, " +
		"availability.availability, " +
		"battery.standbyTime, battery.talkTime, battery.type, " +
		"camera.features, camera.primary, " +
		"connectivity.bluetooth, connectivity.cell, connectivity.gps, connectivity.infrared, connectivity.wifi, " +
		"display.screenResolution, display.screenSize, display.touchScreen, " +
		"hardware.accelerometer, hardware.audioJack, hardware.cpu, hardware.fmRadio, hardware.physicalKeyboard, hardware.usb, " +
		"images.images, " +
		"sizeAndWeight.dimensions, sizeAndWeight.weight, " +
		"storage.flash, storage.ram " +	
		"FROM phones AS p INNER JOIN android ON android.phoneId = p.phoneId " +
		"INNER JOIN availability ON availability.phoneId = p.phoneId " +
		"INNER JOIN battery ON battery.phoneId = p.phoneId " +
		"INNER JOIN camera ON camera.phoneId = p.phoneId " +
		"INNER JOIN connectivity ON connectivity.phoneId = p.phoneId " +
		"INNER JOIN display ON display.phoneId = p.phoneId " +
		"INNER JOIN hardware ON hardware.phoneId = p.phoneId " +
		"INNER JOIN images ON images.phoneId = p.phoneId " +
		"INNER JOIN sizeAndWeight ON sizeAndWeight.phoneId = p.phoneId " +
		"INNER JOIN storage ON storage.phoneId = p.phoneId " +
		"WHERE p.id= '"+id+"'", function(err,rows,fields){
	//	"WHERE p.id= 'dell-streak-7'", function(err,rows,fields){
    if(err)
      {
        console.log("Problem with MySQL"+err);
      }
      else
        {
          res.end(JSON.stringify(rows));
        }
  });
});

//DISPLAYING PHONE DETAILS TO TABLE
app.get('/phoneboard', function(req, res){
 //var id = req.params.id;
  connection.query("SELECT p.phoneId, p.age, p.carrier, p.id, p.imageUrl, p.name, p.snippet, p.additionalFeatures, p.description, " +
		"android.os, android.ui, " +
		"availability.availability, " +
		"battery.standbyTime, battery.talkTime, battery.type, " +
		"camera.features, camera.primary, " +
		"connectivity.bluetooth, connectivity.cell, connectivity.gps, connectivity.infrared, connectivity.wifi, " +
		"display.screenResolution, display.screenSize, display.touchScreen, " +
		"hardware.accelerometer, hardware.audioJack, hardware.cpu, hardware.fmRadio, hardware.physicalKeyboard, hardware.usb, " +
		"images.images, " +
		"sizeAndWeight.dimensions, sizeAndWeight.weight, " +
		"storage.flash, storage.ram " +	
		"FROM phones AS p INNER JOIN android ON android.phoneId = p.phoneId " +
		"INNER JOIN availability ON availability.phoneId = p.phoneId " +
		"INNER JOIN battery ON battery.phoneId = p.phoneId " +
		"INNER JOIN camera ON camera.phoneId = p.phoneId " +
		"INNER JOIN connectivity ON connectivity.phoneId = p.phoneId " +
		"INNER JOIN display ON display.phoneId = p.phoneId " +
		"INNER JOIN hardware ON hardware.phoneId = p.phoneId " +
		"INNER JOIN images ON images.phoneId = p.phoneId " +
		"INNER JOIN sizeAndWeight ON sizeAndWeight.phoneId = p.phoneId " +
		"INNER JOIN storage ON storage.phoneId = p.phoneId", function(err,rows,fields){
	//	"INNER JOIN storage ON storage.phoneId = p.phoneId " +
	//	"WHERE p.id= '"+id+"'", function(err,rows,fields){
	//	"WHERE p.id= 'dell-streak-7'", function(err,rows,fields){
    if(err)
      {
        console.log("Problem with MySQL"+err);
      }
      else
        {
          res.end(JSON.stringify(rows));
        }
  });
});
/*
//DELETING FROM TABLE
app.get('/phoneboard/:id', function(req, res){
var id = req.params.id;
  connection.query("DELETE FROM phones, android, availability,  battery, camera, connectivity, display, hardware, images, sizeAndWeight, storage FROM phones " + 
					"INNER JOIN android " +
					"INNER JOIN availability " +
					"INNER JOIN battery " +
					"INNER JOIN camera " +
					"INNER JOIN connectivity " +
					"INNER JOIN display " +
					"INNER JOIN hardware " +
					"INNER JOIN images " +
					"INNER JOIN sizeAndWeight " +
					"INNER JOIN storage " +
					"WHERE phones.id = '"+id+"' "+
					"AND android.phoneId=phones.phoneId " +
					"AND availability.phoneId=phones.phoneId " +
					"AND battery.phoneId=phones.phoneId " +
					"AND camera.phoneId=phones.phoneId " +
					"AND connectivity.phoneId=phones.phoneId " +
					"AND display.phoneId=phones.phoneId " +
					"AND hardware.phoneId=phones.phoneId " +
					"AND images.phoneId=phones.phoneId " +
					"AND sizeAndWeight.phoneId=phones.phoneId " +
					"AND storage.phoneId=phones.phoneId ", function(err,rows,fields){

    if(err)
      {
        console.log("Problem with MySQL"+err);
      }
      else
        {
          res.end(JSON.stringify(rows));
        }
  });
});

//UPDATE RECORD IN DATABASE TABLES

app.post('/phonedetail/:id',function(req,res){

//phones table
var v_phoneId= req.body.phoneId;
var v_carrier= req.body.carrier;
var v_id= req.body.id;
var v_imageUrl= req.body.imageUrl;
var v_name= req.body.name;
var v_snippet= req.body.snippet;
var v_additionalFeatures= req.body.additionalFeatures;
var v_description= req.body.description;

//availability table
var v_availability= req.body.availability;

//battery table
var v_type= req.body.type;
var v_standbyTime= req.body.standbyTime;
var v_talkTime= req.body.talkTime;

//android table
var v_os= req.body.os;
var v_ui= req.body.ui;

//camera table
var v_primary= req.body.primary;
var v_features= req.body.features;

//connectivity table
var v_bluetooth= req.body.bluetooth;
var v_cell= req.body.cell;
var v_gps= req.body.gps;
var v_infrared= req.body.infrared;
var v_wifi= req.body.wifi;

//display table
var v_screenResolution= req.body.screenResolution;
var v_screenSize= req.body.screenSize;
var v_touchScreen= req.body.touchScreen;

//hardware table
var v_accelerometer= req.body.accelerometer;
var v_audioJack= req.body.audioJack;
var v_cpu= req.body.cpu;
var v_fmRadio= req.body.fmRadio;
var v_physicalKeyboard= req.body.physicalKeyboard;
var v_usb= req.body.usb;

//sizeAndWeight table
var v_dimensions= req.body.dimensions;
var v_weight= req.body.weight;

//storage table
var v_ram= req.body.ram;
var v_flash= req.body.flash;

//images table
var v_images=req.body.images;

		// query for updating phones table
		connection.query("UPDATE into phones SET age='"+v_age+
				"', carrier ='"+v_carrier+
				"', id ='"+v_id+
				"', imageUrl ='"+v_imageUrl+
				"', name ='"+v_name+
				"', snippet ='" +v_snippet+
				"', additionalFeatures ='" +v_additionalFeatures+
				"', description ='" +v_description+
				"' WHERE phoneId= " +v_phoneId ,function(err,rows){
				
				if(err)
				 {
					 console.log("Problem with MySQL"+err);
					 }
				else 
					 {
					  console.log("Phones Table Updated!");
					}           
		  });
  
			// query for updating androids table
		connection.query("UPDATE into phones SET os='"+v_os+
				"', ui ='"+v_ui+
				"', id ='"+v_id+
				"' WHERE phoneId= " +v_phoneId ,function(err,rows){
				
				if(err)
				 {
					 console.log("Problem with MySQL"+err);
					 }
				else 
					 {
					  console.log("Android Table Updated!");
					}           
		  });
		  
			  // query for updating availability table
			  connection.query("UPDATE into phones SET availability='"+v_availability+
					"' WHERE phoneId= " +v_phoneId ,function(err,rows){
					
					if(err)
					 {
						 console.log("Problem with MySQL"+err);
						 }
					else 
						 {
						  console.log("Availability Table Updated!");
						}           
			  });
  
			  // query for updating battery table
			connection.query("UPDATE into battery SET type='"+v_type+
					"', standbyTime ='"+v_standbyTime+
					"', talkTime ='"+v_talkTime+
					"' WHERE phoneId= " +v_phoneId ,function(err,rows){
					
					if(err)
					 {
						 console.log("Problem with MySQL"+err);
						 }
					else 
						 {
						  console.log("Battery Table Updated!");
						}           
			  });
  
				// query for updating camera table
			connection.query("UPDATE into camera SET features='"+v_features+
					"', primary ='"+v_primary+
					"' WHERE phoneId= " +v_phoneId ,function(err,rows){
					
					if(err)
					 {
						 console.log("Problem with MySQL"+err);
						 }
					else 
						 {
						  console.log("Camera Table Updated!");
						}           
			  });
  
				  // query for updating connectivity table
			connection.query("UPDATE into connectivity SET bluetooth='"+v_bluetooth+
					"', cell ='"+v_cell+
					"', gps ='"+v_gps+
					"', infrared ='"+v_infrared+
					"', wifi ='"+v_name+
					"', snippet ='" +v_wifi+
					"' WHERE phoneId= " +v_phoneId ,function(err,rows){
					
					if(err)
					 {
						 console.log("Problem with MySQL"+err);
						 }
					else 
						 {
						  console.log("Connectivity Table Updated!");
						}           
			  });
  
				 // query for updating display table
			connection.query("UPDATE into display SET screenResolution='"+v_screenResolution+
					"', screenSize ='"+v_screenSize+
					"', touchScreen ='"+v_touchScreen+
					"' WHERE phoneId= " +v_phoneId ,function(err,rows){
					
					if(err)
					 {
						 console.log("Problem with MySQL"+err);
						 }
					else 
						 {
						  console.log("Display Table Updated!");
						}           
			  });
  
				// query for updating hardware table
			connection.query("UPDATE into hardware SET accelerometer='"+v_accelerometer+
					"', audioJack ='"+v_audioJack+
					"', cpu ='"+v_cpu+
					"', fmRadio ='"+v_fmRadio+
					"', physicalKeyboard ='"+v_physicalKeyboard+
					"', usb ='" +v_usb+
					"' WHERE phoneId= " +v_phoneId ,function(err,rows){
		
					if(err)
					 {
						 console.log("Problem with MySQL"+err);
						 }
					else 
						 {
						  console.log("Phones Table Updated!");
						}           
			  });
			  
			   // query for updating images table
			connection.query("UPDATE into display SET images='"+v_images+
					"' WHERE phoneId= " +v_phoneId ,function(err,rows){
					
					if(err)
					 {
						 console.log("Problem with MySQL"+err);
						 }
					else 
						 {
						  console.log("Images Table Updated!");
						}           
			  });
			  
					 // query for updating sizeAndWeight table
				connection.query("UPDATE into sizeAndWeight SET dimensions='"+v_dimensions+
						"', weight ='"+v_weight+
						"' WHERE phoneId= " +v_phoneId ,function(err,rows){
						
						if(err)
						 {
							 console.log("Problem with MySQL"+err);
							 }
						else 
							 {
							  console.log("Size and Weight Table Updated!");
							}           
				  });

					   // query for updating storage table
				connection.query("UPDATE into storage SET ram='"+v_ram+
						"', flash ='"+v_flash+
						"' WHERE phoneId= " +v_phoneId ,function(err,rows){
						
						if(err)
						 {
							 console.log("Problem with MySQL"+err);
							 }
						else 
							 {
							  console.log("Storage Table Updated!");
							}           
				  });

				});

*/

/*
  * Start the Express Web Server.
*/
app.listen(3000,function(){
  console.log("It's Started on PORT 3000");
});
