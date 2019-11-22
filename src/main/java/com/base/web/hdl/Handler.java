package com.base.web.hdl;

import org.apache.ibatis.annotations.Insert;

import com.base.web.usr.User;

public interface Handler {
	@Insert(" INSERT INTO USER (UID, PWD, UNAME) VALUES (" + 
			"            #{uid}, #{pwd}, #{uname})")
	public void insertUser(User u);
}
