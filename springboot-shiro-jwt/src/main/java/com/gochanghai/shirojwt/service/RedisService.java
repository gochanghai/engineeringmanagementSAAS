package com.gochanghai.shirojwt.service;

import cn.hutool.core.map.MapUtil;
import cn.hutool.json.JSONUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.data.redis.connection.DataType;
import org.springframework.data.redis.connection.RedisConnection;
import org.springframework.data.redis.core.RedisCallback;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.concurrent.TimeUnit;

/***
 * Redis 操作类
 * @Auther: changhai.liu
 * @Date: 2019/12/17 10:49
 * @Version : V1.0
 */
@Service
public class RedisService {

    @Autowired
    private RedisTemplate redisTemplate;

    /*----------------------- key 基本操作 ----------------------------*/

    /**
     * 判断 key 是否存在
     * @param key
     * @return
     */
    public Boolean existKey(String key) {
        return redisTemplate.hasKey(key);
    }

    /**
     * 删除 key
     * @param key
     */
    public Boolean deleteKey(String key) {
        return redisTemplate.delete(key);
    }

    /**
     * 获取 key-value 的 数据类型
     * @param key
     * @return
     */
    public DataType typeKey(String key) {
        return redisTemplate.type(key);
    }

    /**
     * 设置key的过期时间
     * @param key
     * @param timeout
     * @param unit
     * @return
     */
    public Boolean setExpire(String key, long timeout, TimeUnit unit) {
        return redisTemplate.expire(key, timeout, unit);
    }

    /**
     * 获取 key 的剩余过期时间
     * @param key
     * @param unit
     * @return
     */
    public Long getExpire(String key, TimeUnit unit) {
        return redisTemplate.getExpire(key, unit);
    }

    /**
     * 获取 key 的剩余过期时间
     * @param key
     * @return
     */
    public Long getExpire(String key) {
        return redisTemplate.getExpire(key);
    }

    /**
     * 移除 key 的过期时间,该 key 将永久存在
     * @param key
     * @return
     */
    public Boolean persistExpire(String key) {
        return redisTemplate.persist(key);
    }

    /**
     * 将 key 移动至给定index编号的数据库中
     * @param key
     * @param dbIndex
     * @return
     */
    public Boolean move(String key, int dbIndex) {
        return redisTemplate.move(key, dbIndex);
    }

    /*----------------------- String key 操作 ----------------------------*/

    /**
     * 设置String key的值
     * @param key
     * @param value
     */
    public void setStringKey(String key, Object value) {
        redisTemplate.opsForValue().set(key, value);
    }

    /**
     * 获取String key的值
     * @param key
     * @return
     */
    public Object getStringKey(String key) {
        return redisTemplate.opsForValue().get(key);
    }

    /*----------------------- Hash key 操作 ----------------------------*/

    /**
     * 设置Hash Key中指定字段的值
     * @param key
     * @param field
     * @param value
     */
    public void setHashKey(String key, String field, Object value) {
        redisTemplate.opsForHash().put(key, field, value);
    }

    /**
     * 获取Hash Key中指定字段的值
     * @param key
     * @param field
     * @return
     */
    public Object getHashKey(String key, String field) {
        return redisTemplate.opsForHash().get(key, field);
    }

    /**
     * 获取Hash Key全部字段的值
     * @param key
     * @return
     */
    public Map<Object, Object> getHashKeyAll(String key) {
        return redisTemplate.opsForHash().entries(key);
    }

    /**
     * 判断Hash Key中指定字段是否存在
     * @param key
     * @param field
     * @return
     */
    public Boolean existField(String key, String field) {
        return redisTemplate.opsForHash().hasKey(key, field);
    }

    /**
     * 根据方法名和Map参数生成Hash Key的filed字段值
     * @param methodName
     * @param map
     * @return
     */
    public String getField(String methodName, Map map) {
        StringBuilder sb = new StringBuilder(methodName);
        if (!MapUtil.isEmpty(map)) {
            sb.append(JSONUtil.parseObj(map));
        }
        return sb.toString();
    }

    /**
     * @return
     */
    public String flushDB() {
        return (String) redisTemplate.execute(new RedisCallback() {
            @Override
            public String doInRedis(RedisConnection connection) throws DataAccessException {
                connection.flushDb();
                return "ok";
            }
        });
    }

    /**
     * @return
     */
    public long dbSize() {
        return (long) redisTemplate.execute(new RedisCallback() {
            @Override
            public Long doInRedis(RedisConnection connection) throws DataAccessException {
                return connection.dbSize();
            }
        });
    }

}
