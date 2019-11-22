package com.base.web.pxy;

import java.io.File;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.function.BiFunction;
import java.util.function.BiPredicate;
import java.util.function.Consumer;
import java.util.function.Function;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;

@Component("pxy") @Lazy
public class Proxy {
	public String string(Object param) {
		Function<Object, String> f = String :: valueOf;
		return f.apply(param);
	}
	public int integer(String t) {
		Function<String, Integer> f = Integer::parseInt;
		return f.apply(t);
	}
	public boolean equal(String t, String u) {
		BiPredicate<String, String> f = String :: equals;
		return f.test(t, u);
	}
	public void print(String t) {
		Consumer<String> c = System.out::print;
		c.accept(t);
	}
	public int random(int min, int max) {
		BiFunction<Integer, Integer, Integer> f = (t,u) -> (int) (Math.random()*u-t)+t;
	    return f.apply(min,max);
	}
	public int[] array(int size) {
		Function<Integer, int[]> f = int[] :: new;
		return f.apply(size);
	}
	public String currentDate() {
		return new SimpleDateFormat("yyyy-MM-dd").format(new Date());
	}
	public String currentTime() {
		return new SimpleDateFormat("yyyy-MM-dd hh:mm:ss").format(new Date());
	}
	public File makeDir(String t, String u) {
		BiFunction<String, String, File> f = File :: new;
		return f.apply(t, u);
	}
	public File makeFile(File t, String u) {
		BiFunction<File, String, File> f = File :: new;
		return f.apply(t, u);
	}
}