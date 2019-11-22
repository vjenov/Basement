package com.base.web.usr;

import java.util.HashMap;
import java.util.Map;
import java.util.function.Consumer;
import java.util.function.Function;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.base.web.enums.SQL;
import com.base.web.pxy.Box;
import com.base.web.pxy.Proxy;
import com.base.web.utl.Printer;


@RestController
@RequestMapping("/users")

public class UserCtrl {
	private static final Logger Logger = LoggerFactory.getLogger(UserCtrl.class);
	@Autowired UserMapper userMapper;
	@Autowired Box<Integer> box;
	@Autowired Proxy pxy;
	public int rowCount(){
		int rowCount = userMapper.rowCount();
		pxy.print("rowCount"+rowCount);
		box.put("rowCount", rowCount);
		return box.get("rowCount");
		
	}

}