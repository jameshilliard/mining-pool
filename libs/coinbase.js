var int53 = require('int53');

var t_version = new Buffer(4);
t_version.writeUInt32LE(1,0);

var t_vin_count = new Buffer(1);
t_vin_count[0]=1;

var t_padding= new Buffer('0000000000000000000000000000000000000000000000000000000000000000ffffffff','hex');

var t_sequence = new Buffer(4);
t_sequence.fill(0xff);

var t_vout_count = new Buffer(1);
t_vout_count[0]=1;


var t_locktime = new Buffer(4);
t_locktime.fill(0);

var build_coinbase_tx = function(addr,amount,height,extranonce,pubkey,msg) {

  var coinbase_begin = new Buffer(5);
  coinbase_begin.writeUInt32LE(height,1);
  coinbase_begin[0]=3;
  coinbase_begin=coinbase_begin.slice(0,-1);


  var t_amount = new Buffer(8);
  int53.writeUInt64LE(amount,t_amount);
 
  var coinbase_extra_nonce = new Buffer(4);
  coinbase_extra_nonce.writeUInt32LE(extranonce,0);

  var coinbase = Buffer.concat([coinbase_begin,msg,coinbase_extra_nonce// ,merged_script
			       ]);

  var coinbase_len = new Buffer(1);
  coinbase_len[0] =  coinbase.length;
  
  var t_script_len = new Buffer(1);
  t_script_len[0]=pubkey.length;


  var coinbase_tx = Buffer.concat([t_version,t_vin_count,t_padding,coinbase_len,coinbase,t_sequence,t_vout_count,t_amount,t_script_len,pubkey,t_locktime]);

  return coinbase_tx;
};

module.exports.build_tx = build_coinbase_tx;
