/*
 * Copyright 2019-2029 geekidea(https://github.com/geekidea)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.gochanghai.shirojwt2.convert;

import com.gochanghai.shirojwt2.dto.sysrole.AddSysRoleParam;
import com.gochanghai.shirojwt2.entity.SysRole;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

/**
 * 系统角色转换器
 *
 * @author geekidea
 * @date 2019-10-05
 **/
@Mapper
public interface SysRoleConvert {

    SysRoleConvert INSTANCE = Mappers.getMapper(SysRoleConvert.class);

    /**
     * AddSysRoleParam转SysRole
     *
     * @param addSysRoleParam
     * @return
     */
    SysRole addSysRoleParamToSysRole(AddSysRoleParam addSysRoleParam);
}
